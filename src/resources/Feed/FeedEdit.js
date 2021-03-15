import React from 'react';
import { Layout } from '../../layout/Layout';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { Button } from '../../components/Button';
import { Textarea } from '../../components/Textarea/Textarea';
import { FaRegQuestionCircle } from "react-icons/fa";
import ReactTooltip from 'react-tooltip';
import { createUseStyles } from 'react-jss';

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

export function FeedEdit(props) {
   const classes = useStyles();
   return <Layout>
      <h2>Редактирование фида</h2>
      <ReactTooltip place='right' className={classes.tooltip} effect='solid' />

      <Label>
         <span>Удаление общего описания <FaRegQuestionCircle data-tip="Часто товары, предназначенные для торговых площадок в XML ленте имеют общее описание, которое не обязательно выгружать. Пример 'Телефон мобильный <Только у нас, адрес ХХХ>' и 'Тарелка пластиковая <Только у нас, адрес ХХХ>', если ввести в поле общий текст для этих товаров, он будет вырезан из описания каждой позиции." className={classes.tooptipIcon} /></span>
         <Textarea placeholder="Текст описания (можно оставить пустым)" />
      </Label>

      <Label>
         <span>Стоп-слова <FaRegQuestionCircle data-tip="Список стоп-слов (через запятую). Если в названии товара встречается хотя бы одно из этих слов, то этот товар не попадает в выгрузку." className={classes.tooptipIcon} /> </span>
         <Input placeholder="Стоп-слова через запятую (можно оставить пустым)" />
      </Label>

      <Label>
         <span>Город <FaRegQuestionCircle data-tip="Введите город в предложном падеже, в описание будет добавлена строка «xxx купить в yyy». Где yyy - город, а ххх - название товара (подставится автоматически)." className={classes.tooptipIcon} /></span>
         <Input placeholder="Новороссийске / Екатеринбурге / Москве" />
      </Label>

      <Label>
         <span>Текст после описания <FaRegQuestionCircle data-tip="Введите текст, который будет добавлен после описания." className={classes.tooptipIcon} /></span>
         <Input placeholder="Любой текст (можно оставить пустым)" />
      </Label>

      <Label>
         <Input type="checkbox" />
         <span style={{ verticalAlign: 'middle' }}>Удалять последнюю картинку <FaRegQuestionCircle data-tip="Последняя картинка, приложенная к товару часто может носить информационный характер (адрес/логотип), с помощью данной опции можно автоматически скрывать последнее изображение." className={classes.tooptipIcon} /></span>
      </Label>

      <Label>
         <Input type="checkbox" />
         <span style={{ verticalAlign: 'middle' }}>Исключить товары которых нет в наличии <FaRegQuestionCircle data-tip="Товары, которых нет в наличии не попадут в выгрузку" className={classes.tooptipIcon} /></span>
      </Label>

      <Button>Скачать</Button>
      
   </Layout>
}
export default FeedEdit;