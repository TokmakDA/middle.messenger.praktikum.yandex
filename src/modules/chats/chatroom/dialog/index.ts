import Block from '../../../../tools/Block';
import tpl from './tpl.hbs?raw';
import './style.scss';
import MessageBlock from './message';

class DialogBlock extends Block {
  constructor({ ...props }) {
    super({
      tpl,
      message: new MessageBlock({}),
      ...props,
    });
  }
}

export default DialogBlock;
