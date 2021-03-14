import React from 'react';
import { Layout } from '../layout/Layout';
import { Label } from '../components/Label';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Settings() {
   return <Layout>
      <h2>Настройки</h2>

      <h3>Смена электронной почты</h3>
      <Label>
         <span>Введите новый адрес эл.почты</span>
         <Input />
      </Label>
      <Button>Сменить почту</Button>

      <h3>Смена пароля учетной записи</h3>
      <Label>
         <span>Введите старый пароль</span>
         <Input />
      </Label>

      <Label>
         <span>Введите новый пароль</span>
         <Input />
      </Label>

      <Label>
         <span>Повторите новый пароль</span>
         <Input />
      </Label>

      <Button>Сменить пароль</Button>

   </Layout>;
}
export default Settings;