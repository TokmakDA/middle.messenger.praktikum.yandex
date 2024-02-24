import Handlebars from 'handlebars';
import { InputProps } from '../../@types/types';
import tpl from './tpl.hbs?raw';
import authorize from '../../modules/authorize';
import center from '../../layouts/center';

const inputsList: InputProps[] = [
  {
    type: 'text',
    name: 'login',
    label: 'Логин',
    value: 'ivanivanov',
    error: 'некорректный логин',
    required: true,
  },
  { type: 'password', name: 'password', label: 'Пароль', value: '' },
];

Handlebars.registerPartial('center', center);
Handlebars.registerPartial('authorize', authorize);

export default ({
  props = {
    inputsList,
    button: { text: 'Войти', type: 'submit' },
    link: { text: 'Зарегистрироваться', url: '/signup' },
    title: 'Войти',
    formName: 'signin',
  },
}) => {
  return Handlebars.compile(tpl)({ ...props });
};
