import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';
import { ButtonProps } from '../../@types/types';

export default (props: ButtonProps) => Handlebars.compile(tpl)(props);
