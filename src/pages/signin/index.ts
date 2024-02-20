import Handlebars from 'handlebars';
import { InputProps } from '../../@types/types';
import tpl from './tpl.hbs?raw';
import './style.scss';
import input from '../../components/input/index';
import button from '../../components/button/index';
import link from '../../components/link/index';
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

Handlebars.registerPartial('input', input);
Handlebars.registerPartial('button', button);
Handlebars.registerPartial('link', link);
Handlebars.registerPartial('center', center);

export default ({ props = { inputsList } }) => {
  return Handlebars.compile(tpl)(props);
};
