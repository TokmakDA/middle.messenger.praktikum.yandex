import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';
import sidePanel from '../../modules/chats/chats-panel';
import chatroom from '../../modules/chats/chatroom';
import { CHAT_LIST } from '../../temp/data';
import rows from '../../layouts/rows';

Handlebars.registerPartial('rows', rows);
Handlebars.registerPartial('sidePanel', sidePanel);
Handlebars.registerPartial('chatroom', chatroom);

export default (props = { chats: CHAT_LIST }) => Handlebars.compile(tpl)(props);
