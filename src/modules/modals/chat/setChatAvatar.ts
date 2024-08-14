import { Backdrop, Button, Form, FileInput } from '../../../components';
import ModalBlock from '../../../components/modal/modal';
import { ChatsController } from '../../../controllers';

class SetChatAvatar extends Backdrop {
  private selectedFile: File | null = null;

  constructor({ ...props }) {
    super({
      ...props,
      isOpen: false,
      content: new ModalBlock({
        title: 'Установить аватар для чата',
        content: new Form({
          fields: new FileInput({
            name: 'avatar',
            label: 'Выберите файл',
            accept: 'image/jpeg, image/jpg, image/png, image/gif, image/webp',
            required: true,
            onChange: (file: File) => {
              this.selectedFile = file;
            },
          }),
          actions: new Button({
            flat: true,
            text: 'Установить аватар',
            type: 'submit',
          }),
          onSubmit: async () => {
            if (this.selectedFile) {
              await ChatsController.setChatAvatar(this.selectedFile);
              props.handleClose();
            }
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

export default SetChatAvatar;
