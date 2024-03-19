import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';
import { LinkProps } from '../../@types/types';

export default (props: LinkProps) => Handlebars.compile(tpl)(props);
