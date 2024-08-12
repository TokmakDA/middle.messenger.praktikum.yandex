import { ChatroomBlock } from '../../modules/chats/chatroom';
import { ChatsPanelBlock } from '../../modules/chats/chats-panel';
import { LoyautRows, LoyautSidebar } from '../../layouts';
import { connect } from '../../tools/connect';
import Block from '../../tools/Block';
import {
  AddUserToChat,
  ChatCreating,
  RemoveUserFromChat,
} from '../../modules/modals';

class ChatPage extends Block {
  constructor({ ...props }) {
    super({
      ...props,
      addUserToChatModal: new AddUserToChat({
        handleClose: () => this.closeAddingUser(),
      }),
      chatCreationModal: new ChatCreating({
        handleClose: () => this.closeChatCreation(),
      }),

      removeUserFromChatModal: new RemoveUserFromChat({
        handleClose: () => this.closeRemovingUser(),
      }),
      pageContent: new LoyautRows({
        rows: [
          {
            sidePanel: new LoyautSidebar({
              content: new ChatsPanelBlock({
                clickNewChat: () => {
                  this.openChatCreation();
                },
              }),
            }),
          },
          {
            chatRoom: new ChatroomBlock({
              handleAddUser: () => {
                this.openAddingUser();
              },
              handleRemoveUser: () => {
                this.openRemovingUser();
              },
            }),
          },
        ],
      }),
    });
  }

  // Управление модалкой Создания чата
  openChatCreation() {
    this.updateChatCreationProps(true);
  }
  closeChatCreation() {
    this.updateChatCreationProps();
  }
  updateChatCreationProps(value = false) {
    const { chatCreationModal } = this.children;
    chatCreationModal.setPropsAndChildren({ isOpen: value });
  }

  // Управление модалкой Добавления Юзера
  openAddingUser() {
    this.updateAddingUserProps(true);
  }
  closeAddingUser() {
    this.updateAddingUserProps();
  }
  updateAddingUserProps(value = false) {
    const { addUserToChatModal } = this.children;
    addUserToChatModal.setPropsAndChildren({ isOpen: value });
  }

  // Управление модалкой Добавления Юзера
  openRemovingUser() {
    this.updateRemovingUserProps(true);
  }
  closeRemovingUser() {
    this.updateRemovingUserProps();
  }
  updateRemovingUserProps(value = false) {
    const { removeUserFromChatModal } = this.children;
    removeUserFromChatModal.setPropsAndChildren({ isOpen: value });
  }

  render(): string {
    return `
      <div>
        {{{ pageContent }}}
        {{{ chatCreationModal }}}
        {{{ addUserToChatModal }}}
        {{{ removeUserFromChatModal }}}
      </div>
    `;
  }
}

export default connect(() => ({}))(ChatPage);
