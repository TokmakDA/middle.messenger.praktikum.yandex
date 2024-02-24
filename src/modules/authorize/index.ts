import Handlebars from 'handlebars';
import { InputProps } from '../../@types/types';
import tpl from './tpl.hbs?raw';
import './style.scss';
import input from '../../components/input/index';
import button from '../../components/button/index';
import link from '../../components/link/index';

Handlebars.registerPartial('input', input);
Handlebars.registerPartial('button', button);
Handlebars.registerPartial('link', link);

export default (props: {
  inputsList: InputProps[];
  title: string;
  link: { text: string; url: string };
  button: { text: string; type: string };
  formName: string;
}) => {
  return Handlebars.compile(tpl)(props);
};
