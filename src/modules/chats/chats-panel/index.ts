import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';
import chatCard from './chat-card';
import sidebar from '../../../layouts/sidebar';

Handlebars.registerPartial('chatCard', chatCard);
Handlebars.registerPartial('sidebar', sidebar);

export default (props = { chats: [] }) => {
  return Handlebars.compile(tpl)({ ...props });
};
