import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';
import sidebar from '../../layouts/sidebar';
import back from './back';
import profileInput from './profile-input';

Handlebars.registerPartial('sidebar', sidebar);
Handlebars.registerPartial('back', back);
Handlebars.registerPartial('profileInput', profileInput);

export default (props: {}) => {
  console.log(props);
  return Handlebars.compile(tpl)(props);
};
