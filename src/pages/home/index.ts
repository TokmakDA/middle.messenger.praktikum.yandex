import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';
import center from '../../layouts/center';
import ROUTES from '../../data/constants';

Handlebars.registerPartial('center', center);

export default (
  props = {
    links: ROUTES,
  },
) => Handlebars.compile(tpl)(props);
