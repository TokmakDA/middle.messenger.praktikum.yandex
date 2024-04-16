// import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';
import Block from '../../tools/Block';

class LoyautSidebarBlock extends Block {
  constructor({ ...props }) {
    super({ tpl, ...props });
  }
}

export default LoyautSidebarBlock;
