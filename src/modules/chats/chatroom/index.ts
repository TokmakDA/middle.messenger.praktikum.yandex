import './style.scss';
import Block from '../../../tools/Block';
import HeaderChatsBlock from './header';
import FooterChatsBlock from './footer';
import DialogBlock from './dialog';

class ChatroomBlock extends Block {
  constructor({ ...props }) {
    super({
      template: `
        <section class='chat'>
          {{{header}}}
          {{{dialog}}}
          {{{footer}}}
        </section>
      `,
      header: new HeaderChatsBlock({}),
      footer: new FooterChatsBlock({}),
      dialog: new DialogBlock({}),
      ...props,
    });
  }
}

export default ChatroomBlock;
