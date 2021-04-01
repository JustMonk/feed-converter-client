import React, { useContext, createContext, useState, useEffect } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { config } from '../config';
import { useHistory } from "react-router";
import { Layout } from '../layout/Layout';

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
const authContext = createContext();

export function AuthProvider({ children }) {
   const auth = useAuthProvider();
   return (
      <authContext.Provider value={auth}>
         {children}
      </authContext.Provider>
   );
}

export function useAuth() {
   return useContext(authContext);
}

const AUTH_PENDING = 'AUTH_PENDING';
const AUTH_AUTHORIZED = 'AUTH_AUTHORIZED';
const AUTH_NOT_AUTHORIZED = 'AUTH_NOT_AUTHORIZED';

function useAuthProvider() {
   const [authStatus, setAuthStatus] = useState(AUTH_PENDING);
   const [userInfo, setUserInfo] = useState(null);

   useEffect(() => {
      getToken().then(token => {
         if (token) setAuthStatus(AUTH_AUTHORIZED);
      });
   }, []);

   const saveLocalstorage = (token, expiresDate, refreshToken) => {
      localStorage.setItem('authToken', token);
      localStorage.setItem('authTokenExpires', expiresDate);
      localStorage.setItem('refreshToken', refreshToken);
   }

   const clearLocalstorage = () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authTokenExpires');
   };

   const logout = () => {
      clearLocalstorage();
      setAuthStatus(AUTH_NOT_AUTHORIZED);
   };

   const login = async (login, pass) => {
      const response = await fetch(config.apiPath + 'auth/signin', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ 'email': login, 'password': pass })
      });

      if (!response.ok) {
         return logout();
      }

      const json = await response.json();
      const body = json;
      saveLocalstorage(body.accessToken, body.accessTokenExpires, body.refreshToken);
      setAuthStatus(AUTH_AUTHORIZED);
   };

   const getNewToken = async (refreshToken) => {
      console.log('getNewToken init');
      try {
         const response = await fetch(config.apiPath + 'login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'refresh_token': refreshToken })
         });

         if (!response.ok) {
            throw new Error('Ответ сети был не ok.');
         }

         const json = await response.json();
         const data = json.response;
         saveLocalstorage(data.token, data.tokenExpires, data.refreshToken);
         return response.token;
      } catch (err) {
         logout();
      }
   }

   /*проверяет что токен существует и не истек и возвращает его. если токен истек, рефрешит и возвращает*/
   const getToken = async () => {
      try {
         let token = localStorage.getItem('authToken');
         let tokenExpiresDate = localStorage.getItem('authTokenExpires');
         let refreshToken = localStorage.getItem('refreshToken');
         if (!token && !tokenExpiresDate && !refreshToken) {
            throw new Error('Token does not exist');
         }
         const currentDate = new Date(new Date().toUTCString());
         const expiresDate = new Date(new Date(tokenExpiresDate).toUTCString());
         //console.log('Сравниваю currentDate: %o и expiresDate: %o', +currentDate, +expiresDate)
         if (+currentDate < +expiresDate) return token;
         else {
            return await getNewToken(refreshToken);
         };
      } catch (err) {
         logout();
      }
   }

   const checkToken = async (token) => {
      return fetch(config.apiPath + '/token/check', {
         method: 'GET',
         headers: { 'authorization': token }
      }).then(resp => {
         return resp.json();
      });
   };

   const getUserData = async () => {
      const token = await getToken();
      const response = await fetch(config.apiPath + 'user', {
         method: 'GET',
         headers: { 'x-access-token': `${token}` }
      });

      if (!response.ok) {
         logout();
      }

      const json = await response.json();
      setUserInfo(json);
   }

   useEffect(() => {
      if (authStatus !== AUTH_AUTHORIZED) return;
      getUserData();
   }, [authStatus]);


   //ВАЖНО! в каждом ответе данные дополнительно завернуты в объект response т.е. получать их надо так: resp.json() => res.response()
   return {
      authStatus,
      login,
      logout,
      getToken,
      userInfo
   };
}

function AuthButton() {
   let history = useHistory();
   let auth = useAuth();

   return auth.authStatus === AUTH_AUTHORIZED ? (
      <p>
         Welcome!{" "}
         <button
            onClick={() => {
               auth.signout(() => history.push("/"));
            }}
         >
            Sign out
      </button>
      </p>
   ) : (
      <p>You are not logged in.</p>
   );
}

function FullscreenLoader(props) {
   return <div style={{ background: '#e7ebef', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <span>Загрузка...</span>
   </div>
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export function PrivateRoute({ children, ...rest }) {
   let auth = useAuth();
   if (auth.authStatus === AUTH_PENDING) return <FullscreenLoader />
   return (
      <Route
         {...rest}
         render={({ location }) =>
            <Layout>
               {auth.authStatus === AUTH_AUTHORIZED ? (
                  children
               ) : (
                  location.pathname !== '/login' ?
                     <Redirect
                        to={{
                           pathname: "/login",
                           state: { from: location }
                        }}
                     /> : ''
               )}
            </Layout>
         }
      />
   );
}

export default AuthProvider;