import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import './App.css';
import { createUseStyles, useTheme, ThemeProvider } from 'react-jss';
import { AuthProvider, PrivateRoute } from './providers/AuthProvider';
import { LoginPage } from './resources/LoginPage';
import { RegistrationPage } from './resources/RegistrationPage';
import { Settings } from './resources/Settings';
import { Layout } from './layout/Layout';
import { LoginLayout } from './layout/LoginLayout';
import { Bsod, useBsodCode } from './components/Bsod';
import { useState } from "react";
import { FeedList, FeedCreate, FeedEdit } from "./resources/Feed";
import { FaExclamationCircle } from "react-icons/fa";
import { ToastProvider } from "./contexts/ToastContext";
import { CustomThemeProvider } from './contexts/ThemeContext';

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
         <CustomThemeProvider>
            <ToastProvider>

               {isBsod ? <Bsod /> : ''}

               <Router>

                  <Switch>
                     <Route exact path="/login">
                        <LoginLayout>
                           <LoginPage />
                        </LoginLayout>
                     </Route>

                     <Route exact path="/registration">
                        <LoginLayout>
                           <RegistrationPage />
                        </LoginLayout>
                     </Route>

                     <PrivateRoute exact path="/settings">
                        <Settings />
                     </PrivateRoute>

                     <PrivateRoute exact path="/feed/create">
                        <FeedCreate />
                     </PrivateRoute>

                     <PrivateRoute exact path="/feed/:id">
                        <FeedEdit />
                     </PrivateRoute>

                     <PrivateRoute exact path="/">
                        <FeedList />
                     </PrivateRoute>

                     <PrivateRoute path="*">
                        <NoMatch />
                     </PrivateRoute>
                  </Switch>

               </Router>

            </ToastProvider>
         </CustomThemeProvider>
      </AuthProvider>
   );
}

function NoMatch() {
   return (
      <div style={{ textAlign: 'center', color: 'grey' }}>
         <FaExclamationCircle style={{ fontSize: '2.5em' }} />
         <h2 style={{ margin: '10px 0px' }}>404</h2>
         <h3 style={{ fontWeight: 300, marginBottom: 0 }}>Запрашиваемая страница не найдена</h3>
      </div>
   );
}

export default App;