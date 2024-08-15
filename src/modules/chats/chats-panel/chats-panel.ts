import './style.scss';
import { ChatsPanelButton } from './button';
import Block from '../../../tools/Block';
import { ChatCardBlock } from './chat-card';
import getFormattedDate from '../../../lib/utils/getFormattedDate';
import { connect } from '../../../tools/connect';
import { ChatsController } from '../../../controllers';
import { AppState } from '../../../@types/store';
import { Button, SVGBlock } from '../../../components';
import { Children } from '../../../@types/block';
import store from '../../../services';
import { StoreEvents } from '../../../services/Store';
import { chatSVG } from '../../../assets/images';

type ChatsPanelProps = {
  clickNewChat: (e: Event) => void;
  chats?: Children[] | Block;
  profileButton?: Block;
  newChatButton?: Block;
} & AppState;

class ChatsPanelBlock extends Block {
  constructor(props: ChatsPanelProps) {
    super({
      ...props,
      template: `
        <div class="sidebar__chat-panel">
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
            {{{ newChatButton }}}                                                                                                                                                                                                                                                 </button>
          </div>
          <div class='sidebar__chats chats'>
            <div class='sidebar__line'></div>
            <ul class='chats__list'>
               {{{ chats }}}
            </ul>
          </div>
        </div>
      `,
      profileButton: new ChatsPanelButton(),
      newChatButton: new Button({
        text: 'Создать чат',
        small: true,
        iconBefore: new SVGBlock({
          attr: {
            width: '15px',
          },
          template: chatSVG,
        }),
        events: {
          click: (e: Event) => props.clickNewChat(e),
        },
      }),
    });

    store.on(StoreEvents.Updated, this.updateChatsProps.bind(this));
  }

  getChatListComponets() {
    const props = this.props as ChatsPanelProps;

    return {
      ...props,
      chats: props.chatList.map((chatItem) => ({
        chat: new ChatCardBlock({
          displayTime: chatItem.last_message
            ? getFormattedDate(chatItem.last_message.time)
            : null,
          isMy: chatItem.last_message?.user.login === props.user?.login,
          ...chatItem,
        }),
      })),
    };
  }

  updateChatsProps() {
    this.setPropsAndChildren(this.getChatListComponets());
  }

  async componentDidMount() {
    await ChatsController.fetchChatList({});
    this.updateChatsProps();
  }
}

export default connect(({ chatList, isOpenDialogChat, user }) => ({
  chatList,
  isOpenDialogChat,
  user,
}))(ChatsPanelBlock);
