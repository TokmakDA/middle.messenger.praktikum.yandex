import { Backdrop, Button, Form } from '../../../components';
import ModalBlock from '../../../components/modal/modal';
import { ChatsController } from '../../../controllers';

class RemoveChat extends Backdrop {
  constructor({ ...props }) {
    super({
      ...props,
      isOpen: false,
      content: new ModalBlock({
        title: 'Удалить чат',
        content: new Form({
          actions: [
            {
              submit: new Button({
                flat: true,
                text: 'Удалить',
                type: 'submit',
              }),
            },
            {
              cancel: new Button({
                outline: true,
                text: 'Удалить',
                type: 'button',
                events: {
                  click: (e: Event) => {
                    e.preventDefault();
                    props.handleClose();
                  },
                },
              }),
            },
          ],
          onSubmit: async () => {
            await ChatsController.deleteChat();
            props.handleClose();
          },
        }),
      }),
      events: {
        click: () => {
          props.handleClose();
        },
      },
    });
  }
}

export default RemoveChat;
