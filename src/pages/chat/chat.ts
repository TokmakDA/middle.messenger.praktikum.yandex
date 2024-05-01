import './style.scss';
import ChatsPanelBlock from '../../modules/chats/chats-panel';
import { CHAT_LIST, MY_LOGIN } from '../../temp/data';
import Block from '../../tools/Block';
import ChatRoomBlock from '../../modules/chats/chatroom';
import ChatCardBlock from '../../modules/chats/chats-panel/chat-card';
import getFormattedDate from '../../tools/getFormattedDate';
import CheckmarkBlock from '../../components/checkmark';
import avatarSVG from '../../assets/images/avatar.svg';
import arrowSVG from '../../assets/images/arrow-right.svg';

const chatPage = new Block({
  template: `
  <div class='page__chats'>
    {{{sidePanel}}}
    {{{chatRoom}}}
  </div>
  `,
  chatRoom: new ChatRoomBlock({}),
  sidePanel: new ChatsPanelBlock({
    arrowSVG,
    chats: CHAT_LIST.map((item) => ({
      chat: new ChatCardBlock({
        displayTime: getFormattedDate(item.last_message.time!),
        isMy: item.last_message.user.login === MY_LOGIN,
        checkmark: new CheckmarkBlock({}),
        avatarSVG,
        ...item,
      }),
    })),
  }),
});

export default chatPage;
