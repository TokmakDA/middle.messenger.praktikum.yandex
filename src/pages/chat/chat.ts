import { AppState } from '../../@types/store';

import { ChatroomBlock } from '../../modules/chats/chatroom';
import { ChatsPanelBlock } from '../../modules/chats/chats-panel';
import { ChatCardBlock } from '../../modules/chats/chats-panel/chat-card';
import { LoyautRows } from '../../layouts';
import getFormattedDate from '../../lib/utils/getFormattedDate';
import avatarSVG from '../../assets/images/avatar.svg';
import { connect } from '../../tools/connect';
import { ChatsController } from '../../controllers';

class ChatPage extends LoyautRows {
  private count: number;
  constructor({ ...props }: AppState) {
    super({
      ...props,
      rows: [
        {
          sidePanel: new ChatsPanelBlock({
            chats: props.chatList.map((ChatItem) => ({
              chat: new ChatCardBlock({
                displayTime: ChatItem.last_message
                  ? getFormattedDate(ChatItem.last_message.time)
                  : null,
                isMy: ChatItem.last_message?.user.login === props.user?.login,
                // checkmark: new CheckmarkBlock({}),
                avatarSVG,
                is_active: ChatItem.id === props.currentChat,
                ...ChatItem,
              }),
            })),
          }),
        },
        { chatRoom: new ChatroomBlock({}) },
      ],
    });
    this.count = 0;
  }

  async componentDidMount() {
    this.count += 1;
    console.log(this.count);

    await ChatsController.fetchChatList({});
  }
}

export default connect((store) => ({
  chatList: store.chatList,
  currentChat: store.currentChat,
  isOpenDialogChat: store.isOpenDialogChat,
  user: store.user,
}))(ChatPage);
