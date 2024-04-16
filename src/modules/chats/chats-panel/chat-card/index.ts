import tpl from './tpl.hbs?raw';
import './style.scss';
import Block from '../../../../tools/Block';

class ChatCardBlock extends Block {
  constructor({ ...props }) {
    super({
      tpl,
      ...props,
    });
  }
}

export default ChatCardBlock;
