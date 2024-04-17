import Handlebars from 'handlebars';
import template from './tpl.hbs?raw';
import './style.scss';
import profile from '../../modules/profile';

Handlebars.registerPartial('profile', profile);

export default (props: object) => Handlebars.compile(template)(props);
