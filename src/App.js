import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import './App.css';
import { createUseStyles, useTheme, ThemeProvider } from 'react-jss';
import { theme } from './themes/mainTheme';
import { AuthProvider, PrivateRoute } from './providers/AuthProvider';
import { LoginPage } from './resources/LoginPage';
import { RegistrationPage } from './resources/RegistrationPage';
import { Settings } from './resources/Settings';
import { Layout } from './layout/Layout';
import { Bsod, useBsodCode } from './components/Bsod';
import { useState } from "react";
import { FeedList, FeedCreate, FeedEdit } from "./resources/Feed";
import { FaExclamationCircle } from "react-icons/fa";

function App() {
   const [isBsod, setBsod] = useState(false);
   useBsodCode(() => {
      setBsod(true);
      setTimeout(() => {
         setBsod(false);
      }, 3000);
   });

   return (
      <AuthProvider>
         <ThemeProvider theme={theme}>

            {isBsod ? <Bsod /> : ''}

            <Router>

               <Switch>
                  <Route exact path="/login">
                     <LoginPage />
                  </Route>

                  <Route exact path="/registration">
                     <RegistrationPage />
                  </Route>

                  <PrivateRoute exact path="/settings">
                     <Settings />
                  </PrivateRoute>

                  <PrivateRoute exact path="/feed/create">
                     <FeedCreate />
                  </PrivateRoute>

                  <PrivateRoute exact path="/">
                     <FeedList />
                  </PrivateRoute>

                  <PrivateRoute path="*">
                     <NoMatch />
                  </PrivateRoute>
               </Switch>

            </Router>

         </ThemeProvider>
      </AuthProvider>
   );
}

function NoMatch() {
   return (
      <Layout>
         <div style={{ textAlign: 'center', color: 'grey' }}>
            <FaExclamationCircle style={{ fontSize: '2.5em' }} />
            <h2 style={{ margin: '10px 0px' }}>404</h2>
            <h3 style={{ fontWeight: 300, marginBottom: 0 }}>Запрашиваемая страница не найдена</h3>
         </div>
      </Layout>
   );
}

export default App;