import React, { Fragment } from 'react';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { Button } from '../../components/Button';
import { Textarea } from '../../components/Textarea/Textarea';
import { FaRegQuestionCircle } from "react-icons/fa";
import ReactTooltip from 'react-tooltip';
import { createUseStyles } from 'react-jss';
import { Form, Field } from 'react-final-form';
import { useHistory } from "react-router";
import { config } from '../../config';
import { useAuth } from '../../providers/AuthProvider';

const useStyles = createUseStyles(theme => ({
   tooptipIcon: {
      margin: '0 3px',
      verticalAlign: 'middle',
      color: '#cbd5e0'
   },
   tooltip: {
      maxWidth: '300px',
      boxShadow: '0 1px 1px rgb(0 0 0 / 1%), 0 10px 30px rgb(0 0 0 / 8%)',
      //background: '#fff !important',
      //opacity: '1 !important',
      //color: '#798186 !important',
      //border: '1px solid #e2e8f0 !important',
      padding: '15px !important',
      fontSize: '13px !important',
      '&:after': {
         //borderRightColor: '#fff !important'
      }
   }
}));

export function FeedCreate(props) {
   const auth = useAuth();
   const classes = useStyles();
   const history = useHistory();

   const feedCreateHandler = async (form) => {
      const token = await auth.getToken();
      const response = await fetch(config.apiPath + 'feed', {
         method: 'POST',
         headers: {
            'x-access-token': `${token}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(form)
      });
      if (!response.ok) return;

      history.push('/');
      //const json = await response.json();
      //const data = json.response;
   }

   return <Fragment>
      <h2>Создание нового фида</h2>

      <ReactTooltip place='right' className={classes.tooltip} effect='solid' />

      <Form onSubmit={feedCreateHandler}>
         {formProps => (
            <form onSubmit={formProps.handleSubmit}>

               <Field name="name">
                  {fieldProps => (
                     <Label>
                        <span>Название <FaRegQuestionCircle data-tip="Имя с которым фид будет отображаться в списке." className={classes.tooptipIcon} /></span>
                        <Input placeholder="" {...fieldProps.input} />
                     </Label>
                  )}
               </Field>

               <Field name="url">
                  {fieldProps => (
                     <Label>
                        <span>URL <FaRegQuestionCircle data-tip="Прямая ссылка на фид." className={classes.tooptipIcon} /></span>
                        <Input placeholder="https://domain.com/feed.xml" {...fieldProps.input} />
                     </Label>
                  )}
               </Field>

               <Field name="removedDescription">
                  {fieldProps => (
                     <Label>
                        <span>Удаление общего описания <FaRegQuestionCircle data-tip="Часто товары, предназначенные для торговых площадок в XML ленте имеют общее описание, которое не обязательно выгружать. Пример 'Телефон мобильный <Только у нас, адрес ХХХ>' и 'Тарелка пластиковая <Только у нас, адрес ХХХ>', если ввести в поле общий текст для этих товаров, он будет вырезан из описания каждой позиции." className={classes.tooptipIcon} /></span>
                        <Textarea placeholder="Текст описания (можно оставить пустым)" {...fieldProps.input} />
                     </Label>
                  )}
               </Field>

               <Field name="stopWords"
                  parse={(val) => val.split(',')}
                  format={(val) => val && val.join(',')}
               >
                  {fieldProps => (
                     <Label>
                        <span>Стоп-слова <FaRegQuestionCircle data-tip="Список стоп-слов (через запятую). Если в названии товара встречается хотя бы одно из этих слов, то этот товар не попадает в выгрузку." className={classes.tooptipIcon} /> </span>
                        <Input placeholder="Стоп-слова через запятую (можно оставить пустым)" {...fieldProps.input} />
                     </Label>
                  )}
               </Field>

               <Field name="addedCity">
                  {fieldProps => (
                     <Label>
                        <span>Город <FaRegQuestionCircle data-tip="Введите город в предложном падеже, в описание будет добавлена строка «xxx купить в yyy». Где yyy - город, а ххх - название товара (подставится автоматически)." className={classes.tooptipIcon} /></span>
                        <Input placeholder="Новороссийске / Екатеринбурге / Москве" {...fieldProps.input} />
                     </Label>
                  )}
               </Field>

               <Field name="textAfterDescription">
                  {fieldProps => (
                     <Label>
                        <span>Текст после описания <FaRegQuestionCircle data-tip="Введите текст, который будет добавлен после описания." className={classes.tooptipIcon} /></span>
                        <Input placeholder="Любой текст (можно оставить пустым)" {...fieldProps.input} />
                     </Label>
                  )}
               </Field>

               <Field name="removeLastImage">
                  {fieldProps => (
                     <Label>
                        <Input type="checkbox" {...fieldProps.input} />
                        <span style={{ verticalAlign: 'middle' }}>Удалять последнюю картинку <FaRegQuestionCircle data-tip="Последняя картинка, приложенная к товару часто может носить информационный характер (адрес/логотип), с помощью данной опции можно автоматически скрывать последнее изображение." className={classes.tooptipIcon} /></span>
                     </Label>
                  )}
               </Field>

               <Field name="excludeOutOfStockItems">
                  {fieldProps => (
                     <Label>
                        <Input type="checkbox" {...fieldProps.input} />
                        <span style={{ verticalAlign: 'middle' }}>Исключить товары которых нет в наличии <FaRegQuestionCircle data-tip="Товары, которых нет в наличии не попадут в выгрузку" className={classes.tooptipIcon} /></span>
                     </Label>
                  )}
               </Field>

               <div style={{ marginTop: '10px', display: 'flex' }}>
                  <Button type="submit">Создать</Button>
                  <Button variant="outlined" onClick={() => history.push('/')} style={{ marginLeft: '10px' }}>Отмена</Button>
               </div>

            </form>
         )}
      </Form>

   </Fragment>
}
export default FeedCreate;