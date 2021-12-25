import React, { useState, Fragment } from 'react';
import { Layout } from '../layout/Layout';
import { Label } from '../components/Label';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../providers/AuthProvider';
import { Form, Field } from 'react-final-form';
import { config } from '../config';
import { BiLoaderAlt } from "react-icons/bi";
import { createUseStyles } from 'react-jss';
import { useToastContext, ADD } from "../contexts/ToastContext";

const useStyles = createUseStyles(theme => ({
   '@keyframes rotateCircular': {
      from: {
         transformOrigin: '50% 50%'
      },
      to: {
         transform: 'rotate(360deg)'
      }
   },
   circularProgress: {
      fontSize: '16px',
      animation: '$rotateCircular linear 1.4s infinite',
   }
}));

export function Settings() {
   const auth = useAuth();
   const classes = useStyles();
   const [emailRequestLoading, setEmailLoading] = useState(false);
   const [passRequestLoading, setPassLoading] = useState(false);
   const { toastDispatch } = useToastContext();

   const changeEmail = async (form) => {
      if (emailRequestLoading) return;

      const token = await auth.getToken();
      setEmailLoading(true);
      const response = await fetch(config.apiPath + 'user/change-email', {
         method: 'POST',
         headers: {
            'authorization': `bearer ${token}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(form)
      });

      if (!response.ok) {
         toastDispatch({ type: ADD, payload: { content: { type: "error", message: 'Ошибка при смене электронной почты' } } });
         setEmailLoading(false);
         return;
      } 

      const json = await response.json();
      toastDispatch({ type: ADD, payload: { content: { type: "info", message: json.message } } });
      setEmailLoading(false);
   }

   const changePassword = async (form) => {
      if (passRequestLoading) return;

      const token = await auth.getToken();
      setPassLoading(true);
      const response = await fetch(config.apiPath + 'user/change-password', {
         method: 'POST',
         headers: {
            'authorization': `bearer ${token}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(form)
      });

      if (!response.ok) {
         toastDispatch({ type: ADD, payload: { content: { type: "error", message: 'Ошибка при смене пароля' } } });
         setPassLoading(false);
         return;
      } 

      const json = await response.json();
      toastDispatch({ type: ADD, payload: { content: { type: "info", message: json.message } } });
      setPassLoading(false);
   }

   return <Fragment>
      <h2>Настройки</h2>

      <h3>Смена электронной почты</h3>
      <div style={{ marginBottom: '15px', fontSize: '0.85em' }}>Текущий адрес: {auth.userInfo && auth.userInfo.email}</div>

      <Form onSubmit={changeEmail}>
         {formProps => (
            <form onSubmit={formProps.handleSubmit}>

               <Field name="email">
                  {fieldProps => (
                     <Label>
                        <span>Введите новый адрес эл.почты</span>
                        <Input {...fieldProps.input} />
                     </Label>
                  )}
               </Field>

               <Button type="submit">{emailRequestLoading ? <BiLoaderAlt className={classes.circularProgress} /> : 'Сменить почту'}</Button>
            </form>
         )}
      </Form>


      <h3>Смена пароля учетной записи</h3>

      <Form onSubmit={changePassword}>
         {formProps => (
            <form onSubmit={formProps.handleSubmit}>

               <Field name="password">
                  {fieldProps => (
                     <Label>
                        <span>Введите старый пароль</span>
                        <Input type="password" {...fieldProps.input} />
                     </Label>
                  )}
               </Field>

               <Field name="newPassword">
                  {fieldProps => (
                     <Label>
                        <span>Введите новый пароль</span>
                        <Input type="password" {...fieldProps.input} />
                     </Label>
                  )}
               </Field>

               <Field name="newPasswordConfirmed">
                  {fieldProps => (
                     <Label>
                        <span>Повторите новый пароль</span>
                        <Input type="password" {...fieldProps.input} />
                     </Label>
                  )}
               </Field>

               <Button type="submit">{passRequestLoading ? <BiLoaderAlt className={classes.circularProgress} /> : 'Сменить пароль'}</Button>
            </form>
         )}
      </Form>

   </Fragment>;
}
export default Settings;