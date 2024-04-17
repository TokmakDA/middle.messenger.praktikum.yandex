import Handlebars from 'handlebars';
import template from './tpl.hbs?raw';
import './style.scss';

export default (props: object) => Handlebars.compile(template)(props);
