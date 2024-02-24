import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';

export default (props = { chats: [] }) => {
  return Handlebars.compile(tpl)({ ...props });
};
