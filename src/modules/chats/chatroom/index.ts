import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';
import message from './chat/message';

Handlebars.registerPartial('message', message);

export default (props: {}) => {
  return Handlebars.compile(tpl)({ ...props });
};
