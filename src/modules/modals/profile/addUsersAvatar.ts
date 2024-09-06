import { Backdrop, Button, Form, FileInput } from '../../../components';
import ModalBlock from '../../../components/modal/modal';
import { UserController } from '../../../controllers';

class AddUsersAvatar extends Backdrop {
  private selectedFile: File | null = null;

  constructor({ ...props }) {
    super({
      ...props,
      isOpen: false,
      content: new ModalBlock({
        title: 'Добавить аватар',
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
            text: 'Добавить',
            type: 'submit',
          }),
          onSubmit: async () => {
            if (this.selectedFile) {
              await UserController.updateAvatar(this.selectedFile);
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

export default AddUsersAvatar;
