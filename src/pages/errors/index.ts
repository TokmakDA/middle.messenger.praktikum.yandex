import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';
import { ErrorsPageProps } from '../../@types/types';
import center from '../../layouts/center';

Handlebars.registerPartial('center', center);

export default (props: ErrorsPageProps) => {
  return Handlebars.compile(tpl)(props);
};
