import { Backdrop, Button, Form, Input, ModalBlock } from '../../../components';
import { ChatsController } from '../../../controllers';

class ChatCreating extends Backdrop {
  constructor({ ...props }) {
    super({
      ...props,

      isOpen: false,
      content: new ModalBlock({
        title: 'Создать чат',
        content: new Form({
          fields: new Input({
            name: 'newChat',
            label: 'Название для чата',
            value: '',
            attr: {
              type: 'text',
              required: true,
              minlength: 3,
              maxlength: 40,
            },
          }),
          actions: new Button({
            text: 'Создать ',
            type: 'submit',
          }),
          onSubmit: async (formData) => {
            await ChatsController.createChat({ title: formData.newChat });
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
  }
}

export default ChatCreating;
