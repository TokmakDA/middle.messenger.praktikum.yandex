import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';

export default (props: object) => Handlebars.compile(tpl)(props);
