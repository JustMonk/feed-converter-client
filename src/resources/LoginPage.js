import React, { useState, useEffect } from "react";
import { createUseStyles } from 'react-jss';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Divider } from '../components/Divider';
import { useHistory } from "react-router";
import { FaChessBishop, FaPlusCircle } from "react-icons/fa";
import { useAuth } from '../providers/AuthProvider';
import { Form, Field } from 'react-final-form';
import { Redirect } from "react-router-dom";
import { Alert } from '../components/Alert';
import { CircularProgress } from '../components/CircularProgress';
import { GradientOverlay } from '../components/GradientOverlay';
import { Label } from '../components/Label';

const useStyles = createUseStyles(theme => ({
   '@keyframes slideLeft': {
      from: {
         opacity: 0,
         transform: 'translateX(30px) scale(0.98)'
      },
      to: {
         opacity: 1,
         transform: 'translateX(0px) scale(1)'
      }
   },
   wrapper: {
      //background: '#f7fafc', //#f7fafc
      maxWidth: '100vw',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      //original fill: #7F7BFB
      background: `#f7fafc url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 200 200" xml:space="preserve" height="800px" width="800px"><g><path fill="%23C7D2FE" d="M41.3,-52.9C54.4,-47.3,66.6,-36.4,73.8,-22.1C81,-7.8,83.2,10,75.4,21.7C67.7,33.4,50.1,39.1,35.9,47.5C21.7,56,10.8,67.3,0,67.3C-10.8,67.3,-21.6,55.9,-35.7,47.4C-49.9,38.9,-67.3,33.2,-70,23.2C-72.7,13.1,-60.6,-1.3,-53.8,-15.9C-46.9,-30.5,-45.3,-45.3,-37.2,-52.5C-29.1,-59.7,-14.6,-59.4,-0.2,-59.1C14.1,-58.7,28.2,-58.5,41.3,-52.9Z" transform="translate(100 100) scale(1.21)" fill-rule="nonzero"/></g></svg>') 50% no-repeat`,
   },
   loginCard: {
      animation: '$slideLeft ease-in 0.3s',
      boxShadow: '0 2px 20px 3px rgb(0 0 0 / 6%)',
      background: '#fff',
      width: '410px',
      padding: '2rem',
      position: 'relative'
   },
   forgotPassLink: {
      color: '#2b3044',
      textDecoration: 'none',
      fontSize: '0.9em',
      '&:hover': {
         textDecoration: 'underline'
      }
   }
}));

export function LoginPage(props) {
   const auth = useAuth();
   const classes = useStyles();
   const history = useHistory();
   const [isLoading, setLoading] = useState(false);
   const [isLoginError, setLoginError] = useState(false);

   const redirectToRegistration = () => {
      history.push('/registration');
   }

   const loginSubmitHandler = async (form) => {
      setLoginError(false);
      setLoading(true);
      await auth.login(form.email, form.password);
      setLoading(false);
      if (auth.authStatus !== 'AUTH_AUTHORIZED') setLoginError(true);
   }

   const emailValidate = (value) => {
      setLoginError(false);
      const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      if (!emailRegex.test(value)) return 'Некорректный email';
      return undefined;
   }

   const passwordValidate = (value) => {
      setLoginError(false);
      if (!value || value.length < 6) return 'Проверьте правильность ввода пароля';
      return undefined;
   }

   if (auth.authStatus === 'AUTH_AUTHORIZED') return <Redirect to="/" />
   return <div className={classes.wrapper}>
      <div className={classes.loginCard}>

         {isLoading ? <GradientOverlay><CircularProgress /></GradientOverlay> : ''}

         <div style={{ display: 'flex', alignItems: 'center', fontWeight: 100, marginBottom: '25px' }}>
            <FaChessBishop style={{ marginRight: '10px', fontSize: '1.3em', color: '#83afe0' }} />
            <span>Bishop converter</span>
         </div>

         <h1 style={{ fontWeight: 600, fontSize: '1.6em', color: '#2B3044' }}>Вход в сервис</h1>

         <Form onSubmit={loginSubmitHandler}>
            {formProps => (
               <form onSubmit={formProps.handleSubmit}>

                  {formProps.submitFailed && Object.values(formProps.errors).length ? <Alert title="Не удалось войти">
                     {Object.values(formProps.errors).map(err => <div>{err}</div>)}
                  </Alert> : ''}

                  {isLoginError ? <Alert title="Не удалось войти">
                     Проверьте правильность написания логина или пароля
                  </Alert> : ''}

                  <Field name="email" validate={emailValidate}>
                     {fieldProps => (
                        <Label>
                           <span>Эл.почта</span>
                           <Input {...fieldProps.input} />
                        </Label>
                     )}
                  </Field>

                  <Field name="password" validate={passwordValidate}>
                     {fieldProps => (
                        <Label>
                           <span>Пароль</span>
                           <Input type="password" {...fieldProps.input} />
                        </Label>
                     )}
                  </Field>

                  <a href="#" className={classes.forgotPassLink}>Забыли пароль?</a>

                  <div style={{ marginTop: '10px' }}>
                     <Button type="submit" fullWidth>Войти</Button>
                  </div>

               </form>
            )}
         </Form>

         <Divider />
         <Button fullWidth onClick={redirectToRegistration} color="green" iconLeft={<FaPlusCircle />}>Создать учетную запись</Button>

      </div>
   </div>
}

export default LoginPage;