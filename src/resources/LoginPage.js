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
import { useThemeContext } from '../contexts/ThemeContext';
import { Dialog } from '../components/Dialog';

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
   loginCard: {
      animation: '$slideLeft ease-in 0.3s',
      boxShadow: '0 2px 20px 3px rgb(0 0 0 / 6%)',
      background: theme.background.paper,
      color: theme.text.primary,
      width: '410px',
      padding: '2rem',
      position: 'relative'
   },
   forgotPassLink: {
      color: theme.text.activeLink,
      textDecoration: 'none',
      fontSize: '0.9em',
      '&:hover': {
         textDecoration: 'underline'
      },
      cursor: 'pointer'
   },
   cardHeader: {
      color: theme.text.activeLink,
      fontWeight: 600,
      fontSize: '1.6em'
   }
}));

export function LoginPage(props) {
   const auth = useAuth();
   const classes = useStyles();
   const history = useHistory();
   const [isLoading, setLoading] = useState(false);
   const [isLoginError, setLoginError] = useState(false);
   const [restorePassDialog, setRestoreDialog] = useState(false);

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
   return <div className={classes.loginCard}>

      {isLoading ? <GradientOverlay><CircularProgress /></GradientOverlay> : ''}

      <div style={{ display: 'flex', alignItems: 'center', fontWeight: 100, marginBottom: '25px' }}>
         <FaChessBishop style={{ marginRight: '10px', fontSize: '1.3em', color: '#83afe0' }} />
         <span>Bishop converter</span>
      </div>

      <h1 className={classes.cardHeader}>Вход в сервис</h1>

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

               <a className={classes.forgotPassLink} onClick={() => setRestoreDialog(true)}>Забыли пароль?</a>

               <Dialog open={restorePassDialog}
                  onClose={() => setRestoreDialog(false)}
                  controls={<>
                     <Button>Подтвердить</Button>
                     <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={() => setRestoreDialog(false)}>Закрыть</Button>
                  </>}
                  content={<>
                     <h3 style={{ marginTop: '0' }}>Восстановление пароля</h3>
                     <span style={{ fontSize: '0.9em' }}>Введите адрес электронной почты, на него будет отправлена ссылка для восстановления пароля</span>
                     <Input placeholder="example@domain.com" fullWidth />
                  </>}
               />

               <div style={{ marginTop: '10px' }}>
                  <Button type="submit" fullWidth>Войти</Button>
               </div>

            </form>
         )}
      </Form>

      <Divider />
      <Button fullWidth onClick={redirectToRegistration} color="green" iconLeft={<FaPlusCircle />}>Создать учетную запись</Button>

   </div>
}

export default LoginPage;