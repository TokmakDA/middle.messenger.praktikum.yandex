import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';
import header from './header';
import chat from './chat';
import footer from './footer';

Handlebars.registerPartial('header', header);
Handlebars.registerPartial('chat', chat);
Handlebars.registerPartial('footer', footer);

export default (props: {}) => {
  return Handlebars.compile(tpl)({ ...props });
};
