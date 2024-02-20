import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';
import sidePanel from '../../modules/chats/side-panel';
import chatroom from '../../modules/chats/chatroom';
import { CHAT_LIST } from '../../temp/data';

Handlebars.registerPartial('sidePanel', sidePanel);
Handlebars.registerPartial('chatroom', chatroom);

export default (props = { chats: CHAT_LIST }) => {
  return Handlebars.compile(tpl)(props);
};
