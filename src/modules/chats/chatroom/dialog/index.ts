import Block from '../../../../tools/Block';
import template from './tpl.hbs?raw';
import './style.scss';
import MessageBlock from './message';

class DialogBlock extends Block {
  constructor({ ...props }) {
    super({
      template,
      message: new MessageBlock({}),
      ...props,
    });
  }
}

export default DialogBlock;
