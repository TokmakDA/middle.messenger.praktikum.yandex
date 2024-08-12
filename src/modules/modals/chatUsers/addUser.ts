import { Backdrop, Button, Form, Input } from '../../../components';
import ModalBlock from '../../../components/modal/modal';
import { ModalController } from '../../../controllers';

class AddUserToChat extends Backdrop {
  constructor({ ...props }) {
    super({
      ...props,
      isOpen: false,
      content: new ModalBlock({
        title: 'Добавить пользователя',
        content: new Form({
          fields: new Input({
            type: 'text',
            name: 'login',
            label: 'Логин',
            value: '',
            attr: {
              type: 'text',
              required: true,
              pattern: '(?=.*[a-z]|[A-Z])[a-zA-Z0-9\\-_]{3,20}',
              minlength: 3,
              maxlength: 20,
            },
          }),
          actions: new Button({
            flat: true,
            text: 'Добавить',
            type: 'submit',
          }),
          onSubmit: async (formData) => {
            await ModalController.AddUserToChat({ login: formData.login });
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

export default AddUserToChat;
