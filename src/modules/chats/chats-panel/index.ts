import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';
import chatCard from './chat-card';
import sidebar from '../../../layouts/sidebar';
import arrowSVG from '../../../assets/images/arrow-right.svg';

Handlebars.registerPartial('chatCard', chatCard);
Handlebars.registerPartial('sidebar', sidebar);

export default (props = { chats: [] }) => {
  return Handlebars.compile(tpl)({ ...props, arrowSVG });
};
