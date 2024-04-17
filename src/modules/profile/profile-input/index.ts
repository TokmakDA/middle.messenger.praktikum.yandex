import Handlebars from 'handlebars';
import template from './tpl.hbs?raw';
import './style.scss';
import { InputProps } from '../../../@types/types';

export default (props: InputProps) => Handlebars.compile(template)(props);
