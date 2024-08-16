import { Backdrop, Button, Form, FileInput } from '../../../components';
import ModalBlock from '../../../components/modal/modal';
import { ChatsController } from '../../../controllers';

class SendChatMedia extends Backdrop {
  private selectedFile: File | null = null;

  constructor({ ...props }) {
    super({
      ...props,
      isOpen: false,
      content: new ModalBlock({
        title: 'Отправить изображение',
        content: new Form({
          fields: new FileInput({
            name: 'resource',
            label: 'Выберите файл',
            accept: 'image/jpeg, image/jpg, image/png, image/gif, image/webp',
            required: true,
            onChange: (file: File) => {
              this.selectedFile = file;
            },
          }),
          actions: new Button({
            flat: true,
            text: 'Отправить',
            type: 'submit',
          }),
          onSubmit: async () => {
            if (this.selectedFile) {
              await ChatsController.sendChatFile(this.selectedFile);
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

export default SendChatMedia;
