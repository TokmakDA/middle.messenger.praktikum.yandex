import './style.scss';
import Block from '../../../tools/Block';
import { HeaderChatroomBlock } from './header-chatroom';
import { FooterChatroomBlock } from './footer-chatroom';
import { DialogBlock } from './dialog';

class ChatroomBlock extends Block {
  constructor({ ...props }) {
    super({
      template: `
        <section class='chat'>
          {{{ header }}}
          {{{ dialog }}}
          {{{ footer }}}
        </section>
      `,
      header: new HeaderChatroomBlock({}),
      footer: new FooterChatroomBlock({}),
      dialog: new DialogBlock({}),
      ...props,
    });
  }
}

export default ChatroomBlock;
