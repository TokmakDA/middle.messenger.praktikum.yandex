import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';
import avatarSVG from '../../../../assets/images/avatar.svg';

export default (props: object) =>
  Handlebars.compile(tpl)({ ...props, avatarSVG });
