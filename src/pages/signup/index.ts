import Handlebars from 'handlebars';
import { InputProps } from '../../@types/types';
import tpl from './tpl.hbs?raw';
import center from '../../layouts/center';
import authorize from '../../modules/authorize';

const inputsList: InputProps[] = [
  {
    type: 'text',
    name: 'login',
    label: 'Логин',
    value: 'ivanivanov',
    error: 'некорректный логин',
    required: true,
  },
  {
    type: 'text',
    name: 'first_name',
    label: 'Имя',
    value: 'Иван',
    required: true,
  },
  {
    type: 'text',
    name: 'second_name',
    label: 'Фамилия',
    value: 'Иванов',
    required: true,
  },
  {
    type: 'text',
    name: 'second_name',
    label: 'Фамилия',
    value: 'Иванов',
    required: true,
  },
  {
    type: 'email',
    name: 'email',
    label: 'Почта',
    value: 'email@yandex.ru',
    required: true,
  },
  {
    type: 'phone',
    name: 'phone',
    label: 'Телефон',
    value: '+7(912)345-67-89',
    required: true,
  },
  {
    type: 'password',
    name: 'password',
    label: 'Пароль',
    value: 'qazwsx',
    required: true,
  },
  {
    type: 'password',
    name: 'rePassword',
    label: 'Повторите пароль',
    value: 'qazwsx',
    required: true,
  },
];

Handlebars.registerPartial('center', center);
Handlebars.registerPartial('authorize', authorize);

export default ({
  props = {
    inputsList,
    button: { text: 'Зарегистрироваться ', type: 'submit' },
    link: { text: 'Войти', url: '/signin/' },
    title: 'Зарегистрироваться',
  },
}) => {
  return Handlebars.compile(tpl)(props);
};
