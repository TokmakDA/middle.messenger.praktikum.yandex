import template from './tpl.hbs?raw';
import './style.scss';
import Block from '../../tools/Block';

class CheckmarkBlock extends Block {
  constructor({ ...props }) {
    super({
      template,
      ...props,
    });
  }
}

export default CheckmarkBlock;
