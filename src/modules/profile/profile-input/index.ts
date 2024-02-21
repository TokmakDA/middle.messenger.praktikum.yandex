import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';
import { InputProps } from '../../../@types/types';

export default (props: InputProps) => {
  // console.log(props);
  return Handlebars.compile(tpl)({...props});
};
