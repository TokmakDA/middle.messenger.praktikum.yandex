import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';
import { ErrorsPageProps } from '../../@types/types';
import layout from '../../layouts/center';

Handlebars.registerPartial('layout', layout);

export default (props: ErrorsPageProps) => {
  return Handlebars.compile(tpl)(props);
};
