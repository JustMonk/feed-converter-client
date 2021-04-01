import React, { useState, useEffect } from "react";
import { createUseStyles } from 'react-jss';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Divider } from '../components/Divider';
import { useHistory } from "react-router";
import { Form, Field } from 'react-final-form';
import { FaChessBishop, FaArrowLeft } from "react-icons/fa";
import { Alert } from '../components/Alert';
import { config } from '../config';
import { useAuth } from '../providers/AuthProvider';
import { Redirect } from "react-router-dom";
import { CircularProgress } from '../components/CircularProgress';
import { GradientOverlay } from '../components/GradientOverlay';
import { Label } from '../components/Label';

const useStyles = createUseStyles(theme => ({
   '@keyframes slideRight': {
      from: {
         opacity: 0,
         transform: 'translateX(-30px) scale(0.98)'
      },
      to: {
         opacity: 1,
         transform: 'translateX(0px) scale(1)'
      }
   },
   loginCard: {
      animation: '$slideRight ease-in 0.3s',
      boxShadow: '0 2px 20px 3px rgb(0 0 0 / 6%)',
      background: theme.background.paper,
      color: theme.text.primary,
      width: '410px',
      padding: '2rem',
      position: 'relative'
   },
   cardHeader: {
      color: theme.text.activeLink,
      fontWeight: 600,
      fontSize: '1.6em'
   }
}));

export function RegistrationPage(props) {
   const auth = useAuth();
   const classes = useStyles();
   const history = useHistory();
   const [response, setResponse] = useState(''); //ответ от сервера, по сути статус нашей формы. если не пуст, значит мы зарегались
   const [isLoading, setLoading] = useState(false);

   const backToLogin = () => {
      history.push('/login');
   }

   const registrationSubmitHandler = async (form) => {
      setLoading(true);
      const response = await fetch(config.apiPath + 'auth/signup', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ 'email': form.email, 'password': form.password })
      });

      if (!response.ok) {
         setLoading(false);
         throw new Error('Ответ сети был не ok.');
      } else {
         setResponse('Регистрация завершена. На вашу почту отправлена ссылка для подтверждения. Если письмо по какой-то причине не отображается, проверьте папку спам.');
         setLoading(false);
      }
   }

   const emailValidate = (value) => {
      const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      if (!emailRegex.test(value)) return 'Некорректный email';
      return undefined;
   }

   const passwordValidate = (value) => {
      if (!value || value.length < 6) return 'Пароль должен быть длиннее 5 символов';
      return undefined;
   }

   if (auth.authStatus === 'AUTH_AUTHORIZED') return <Redirect to="/" />
   return <div className={classes.loginCard}>

      {isLoading ? <GradientOverlay><CircularProgress /></GradientOverlay> : ''}

      <div style={{ display: 'flex', alignItems: 'center', fontWeight: 100, marginBottom: '25px' }}>
         <FaChessBishop style={{ marginRight: '10px', fontSize: '1.3em', color: '#83afe0' }} />
         <span>Bishop converter</span>
      </div>

      <h1 className={classes.cardHeader}>Регистрация</h1>

      {!response ? <Form onSubmit={registrationSubmitHandler}>
         {formProps => (
            <form onSubmit={formProps.handleSubmit}>

               {formProps.submitFailed && Object.values(formProps.errors).length ? <Alert title="Ошибки заполнения:">{Object.values(formProps.errors).map(err => <div>{err}</div>)}</Alert> : ""}

               <Field name="email" validate={emailValidate}>
                  {fieldProps => (
                     <Label>
                        <span>Эл.почта</span>
                        <Input {...fieldProps.input} />
                     </Label>
                  )
                  }
               </Field>

               <Field name="password" validate={passwordValidate}>
                  {fieldProps => (
                     <Label>
                        <span>Пароль</span>
                        <Input type="password" {...fieldProps.input} />
                     </Label>
                  )}
               </Field>

               <Field name="passwordRepeat" validate={(val) => !val || formProps.values.password !== val ? 'Пароли не совпадают' : undefined}>
                  {fieldProps => (
                     <Label>
                        <span>Повторите пароль</span>
                        <Input type="password" {...fieldProps.input} />
                     </Label>
                  )}
               </Field>

               <div style={{ marginTop: '10px' }}>
                  <Button type="submit" fullWidth>Зарегистрироваться</Button>
                  <Divider />
               </div>

            </form>
         )}
      </Form> : <Alert type="success">{response}</Alert>
      }

      <Button fullWidth onClick={backToLogin} color="green" iconLeft={<FaArrowLeft />}>Назад ко входу</Button>

   </div>
}

export default RegistrationPage;