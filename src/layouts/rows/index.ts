import Block from '../../tools/Block';
import template from './tpl.hbs?raw';
import './style.scss';

class LoyautRowsBlock extends Block {
  constructor({ ...props }) {
    super({ template, ...props });
  }
}

export default LoyautRowsBlock;
