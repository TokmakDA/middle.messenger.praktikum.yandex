import { Backdrop, Button, Form, Select } from '../../../components';
import ModalBlock from '../../../components/modal/modal';
import { ModalController } from '../../../controllers';
import { connect } from '../../../tools/connect';
import { ChatUser } from '../../../@types/api';
import store from '../../../services';
import { StoreEvents } from '../../../services/Store';
import { AppState } from '../../../@types/store';

class RemoveUserFromChat extends Backdrop {
  constructor({ ...props }) {
    super({
      ...props,
      isOpen: false,
      content: new ModalBlock({
        title: 'Удалить пользователя',
        content: new Form({
          fields: new Select({
            name: 'userId',
            label: 'Выберите пользователя',
            attr: {
              required: `${true}`,
            },
            options: [],
          }),
          actions: new Button({
            flat: true,
            text: 'Удалить',
            type: 'submit',
          }),
          onSubmit: async (formData) => {
            await ModalController.removeUserFromChat({
              id: Number(formData.userId),
            });
            props.handleClose();
          },
        }),
      }),
      events: {
        click: (e) => {
          props.handleClose(e);
        },
      },
    });
    store.on(StoreEvents.Updated, this.handleStoreUpdate.bind(this));
  }

  handleStoreUpdate() {
    const state = store.getState();
    this.children.content.children.content.children.fields.setPropsAndChildren({
      options: this.getOptions(state),
    });
  }

  getOptions(props: AppState) {
    return (
      props.chatUsers
        .filter(
          (chatUser: ChatUser) =>
            chatUser.role !== 'admin' && chatUser.id !== props.user?.id,
        )
        ?.map((chatUser: ChatUser) => {
          return { value: chatUser.id, label: chatUser.login };
        }) || []
    );
  }

  componentWillUnmount() {
    store.off(StoreEvents.Updated, this.handleStoreUpdate);
  }
}

export default connect(({ chatUsers, user }) => ({ chatUsers, user }))(
  RemoveUserFromChat,
);
