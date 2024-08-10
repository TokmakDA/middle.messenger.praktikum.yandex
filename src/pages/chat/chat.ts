import { AppState } from '../../@types/store';
import { ChatroomBlock } from '../../modules/chats/chatroom';
import { ChatsPanelBlock } from '../../modules/chats/chats-panel';
import { LoyautRows, LoyautSidebar } from '../../layouts';
import { connect } from '../../tools/connect';
import Block from '../../tools/Block';
import ModalBlock from '../../components/modal/modal';
import { Backdrop, Button, Form, Input } from '../../components';
import { ChatsController } from '../../controllers';

class ChatPage extends Block {
  constructor({ ...props }) {
    super({
      ...props,
      isNewChatModal: false, // Инициализация состояния

      modal: null,
      pageContent: new LoyautRows({
        rows: [
          {
            sidePanel: new LoyautSidebar({
              content: new ChatsPanelBlock({
                clickNewChat: (e: Event) => {
                  console.log(e);
                  this.openNewChatModal();
                },
              }),
            }),
          },
          {
            chatRoom: new ChatroomBlock({}),
          },
        ],
      }),
    });
  }

  openNewChatModal() {
    this.isNewChatModal = true;
    this.updateProps();
  }

  closeNewChatModal() {
    this.isNewChatModal = false;
    this.updateProps();
  }

  updateProps() {
    this.setPropsAndChildren({
      modal: this.getModal(),
      isNewChatModal: this.isNewChatModal,
    });
  }

  getModal = () => {
    return this.isNewChatModal
      ? new Backdrop({
          content: new ModalBlock({
            title: 'Создать чат',
            events: {
              click: (e: Event) => {
                e.stopPropagation();
              },
            },
            content: new Form({
              fields: new Input({
                name: 'newChat',
                label: 'Название для чата',
                value: '',
                attr: {
                  type: 'text',
                  required: true,
                  // pattern: '(?=.*[a-z]|[A-Z])[a-zA-Z0-9\\-_]{3,20}',
                  minlength: 3,
                  maxlength: 40,
                },
              }),
              actions: new Button({
                text: 'Создать ',
                type: 'submit',
              }),
              onSubmit: async (formData) => {
                console.log(formData);

                await ChatsController.createChat({ title: formData.newChat });
                this.closeNewChatModal();
              },
            }),
          }),
          events: {
            click: () => {
              this.closeNewChatModal();
            },
          },
        })
      : null;
  };

  render(): string {
    return `
      <div>
        {{{ pageContent }}}
        {{#if isNewChatModal }}
          {{{ modal }}}
        {{/if}}
      </div>
    `;
  }
}

export default connect(() => ({}))(ChatPage);
