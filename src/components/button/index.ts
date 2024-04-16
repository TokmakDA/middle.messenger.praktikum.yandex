import Block from '../../tools/Block';
import tpl from './tpl.hbs?raw';
import './style.scss';

class ButtonBlock extends Block {
  constructor({ ...props }) {
    super({ tpl, ...props });
  }
}

export default ButtonBlock;
