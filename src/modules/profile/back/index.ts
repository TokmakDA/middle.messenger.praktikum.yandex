import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';

export default (props: {}) => {
  console.log(props)
  return Handlebars.compile(tpl)(props);
};
