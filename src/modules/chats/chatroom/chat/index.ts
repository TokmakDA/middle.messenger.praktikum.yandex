import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';
import message from './message';

Handlebars.registerPartial('message', message);

export default (props: object) => {
  return Handlebars.compile(tpl)(props);
};
