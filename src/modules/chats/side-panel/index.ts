import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';
import chatCard from './chat-card';
import { CHAT_LIST } from '../../../temp/data';

Handlebars.registerPartial('chatCard', chatCard);

export default (props = { chats: CHAT_LIST }) => {
  return Handlebars.compile(tpl)({ ...props });
};
