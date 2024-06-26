import { CHAT_LIST, MY_LOGIN } from '../../temp/data';
import { ChatroomBlock } from '../../modules/chats/chatroom';
import { ChatsPanelBlock } from '../../modules/chats/chats-panel';
import { ChatCardBlock } from '../../modules/chats/chats-panel/chat-card';
import { LoyautRows } from '../../layouts';
import getFormattedDate from '../../tools/getFormattedDate';
import CheckmarkBlock from '../../components/checkmark';
import avatarSVG from '../../assets/images/avatar.svg';

const chatPage = new LoyautRows({
  rows: [
    {
      sidePanel: new ChatsPanelBlock({
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
    },
    { chatRoom: new ChatroomBlock({}) },
  ],
});

export default chatPage;
