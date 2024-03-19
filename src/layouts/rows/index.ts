import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';

export default (props = {}) => Handlebars.compile(tpl)(props);
