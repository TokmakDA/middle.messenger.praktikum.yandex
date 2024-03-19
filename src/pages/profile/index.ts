import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';
import profile from '../../modules/profile';

Handlebars.registerPartial('profile', profile);

export default (props: object) => Handlebars.compile(tpl)(props);
