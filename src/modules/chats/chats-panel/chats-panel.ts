import './style.scss';
import { ChatsPanelButton } from './button';
import Block from '../../../tools/Block';
import { ChatCardBlock } from './chat-card';
import getFormattedDate from '../../../lib/utils/getFormattedDate.ts';
import avatarSVG from '../../../assets/images/avatar.svg';
import { connect } from '../../../tools/connect.ts';
import { ChatsController } from '../../../controllers';
import {AppState} from "../../../@types/store";

class ChatsPanelBlock extends Block {
  private count: number;

  constructor({ ...props }) {
    super({
      ...props,

      template: `
        <section class='sidebar'>
          <div class='sidebar__header'>
            {{{ profileButton }}}
            <form class='sidebar__search'>
              <input
                type='search'
                class='sidebar__search-input'
                placeholder='Поиск'
                name='chat-search'
                id='chat-search'
                value=''
              />
            </form>
          </div>
          <div class='sidebar__chats chats'>
            <div class='sidebar__line'></div>
            <ul class='chats__list'>
               {{{ chats }}}
            </ul>
          </div>
        </section>
      `,
      profileButton: new ChatsPanelButton(),
    });
    this.count = 1000;
  }
  async componentDidMount() {
    this.count += 1;
    console.log(this.count);

    await ChatsController.fetchChatList({});
    const props = this.props as AppState;
    this.setProps({
      chats: props.chatList.map((ChatItem) => ({
        chat: new ChatCardBlock({
          displayTime: ChatItem.last_message
            ? getFormattedDate(ChatItem.last_message.time)
            : null,
          isMy: ChatItem.last_message?.user.login === props.user?.login,
          // checkmark: new CheckmarkBlock({}),
          // avatarSVG,
          is_active: ChatItem.id === props.currentChat,
          ...ChatItem,
        }),
      })),
    });
  }
}

// export default ChatsPanelBlock;
export default connect((store) => ({
  chatList: store.chatList,
  currentChat: store.currentChat,
  isOpenDialogChat: store.isOpenDialogChat,
  user: store.user,
}))(ChatsPanelBlock);
