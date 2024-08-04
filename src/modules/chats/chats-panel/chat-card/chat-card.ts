import template from './tpl.hbs?raw';
import './style.scss';
import Block from '../../../../tools/Block';

class ChatCardBlock extends Block {
  constructor({ ...props }) {
    super({
      template,
      ...props,
    });

    console.log('ChatCardBlock =>', this.props);
  }
}

export default ChatCardBlock;
