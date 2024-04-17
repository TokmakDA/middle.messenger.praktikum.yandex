// import Handlebars from 'handlebars';
import template from './tpl.hbs?raw';
import './style.scss';
import Block from '../../tools/Block';

class LoyautSidebarBlock extends Block {
  constructor({ ...props }) {
    super({ template, ...props });
  }
}

export default LoyautSidebarBlock;
