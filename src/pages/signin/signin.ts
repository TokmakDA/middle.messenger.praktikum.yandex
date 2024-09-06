import { InputProps } from '../../@types/types';
import { Input, Button, Form, ModalBlock } from '../../components';
import { LoyautCenter } from '../../layouts';
import { UserAuthController } from '../../controllers';
import { TSignInRequest } from '../../@types/api';
import { connect } from '../../tools/connect';
import Block from '../../tools/Block';

import { SIGN_IN_INPUT_FIELDS as signInInputs } from '../../lib/constants/formFieldConstants';
import { AppState } from '../../@types/store';
import RouteManager from '../../routes/RouteManager';

class SignInPage extends LoyautCenter {
  constructor(props: { content: ModalBlock; error: AppState['error'] }) {
    super({
      ...props,
      content: new ModalBlock({
        title: 'Войти',
        content: new Form({
          handleInputChange() {
            UserAuthController.changeForm();
          },
          errorMessage: props.error,
          fields: signInInputs.map((item: InputProps) => ({
            field: new Input({ ...item }),
          })),
          formName: 'signin',
          actions: [
            {
              send: new Button({ flat: true, text: 'Войти', type: 'submit' }),
            },
            {
              link: new Button({
                text: 'Зарегистрироваться',
                className: 'link',
                page: 'signin',
                events: {
                  click: (e) => this.handleSignIn(e),
                },
              }),
            },
          ],
          onSubmit: (formData) => this.handleSubmit(formData),
        }),
      }),
    });
  }

  handleSignIn(e: Event) {
    e.preventDefault();
    RouteManager.goRoute('signin');
  }

  async handleSubmit(formData: Record<string, string>): Promise<void> {
    const data: TSignInRequest = {
      login: formData.login,
      password: formData.password,
    };

    await UserAuthController.login(data);
  }
}

export default connect(({ isLoading, error }) => ({
  isLoading,
  error,
}))(SignInPage as typeof Block);
