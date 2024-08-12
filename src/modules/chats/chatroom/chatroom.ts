import './style.scss';
import Block from '../../../tools/Block';
import { HeaderChatroomBlock } from './header-chatroom';
import { FooterChatroomBlock } from './footer-chatroom';
import { CorrespondenceBlock } from './сorrespondence';
import { connect } from '../../../tools/connect';
import { AppState } from '../../../@types/store';

class ChatroomBlock extends Block {
  constructor({ ...props }: AppState) {
    super({
      ...props,
      header: new HeaderChatroomBlock({ ...props }),
      correspondence: new CorrespondenceBlock({ ...props }),
      footer: new FooterChatroomBlock({}),

      template: `
        <section class='chat'>
          {{#if currentChat}}
            {{{ header }}}
            {{{ correspondence }}}
            {{{ footer }}}
          {{else}}
            <div class="chat__placeholder">Выберите чат, чтобы отправить сообщение</div>
          {{/if}}
        </section>
      `,
    });
  }
}

// export default ChatroomBlock;

export default connect(({ currentChat, messages, user }) => ({
  currentChat,
  messages,
  user,
}))(ChatroomBlock);
