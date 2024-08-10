import { InputProps } from '../../@types/types';
import { Input, Button, Form, ModalBlock } from '../../components';
import { ROUTES_PATH } from '../../lib/constants/routes';
import { LoyautCenter } from '../../layouts';
import { UserAuthController } from '../../controllers';
import { TSignInRequest } from '../../@types/api';
import { connect } from '../../tools/connect';
import Block from '../../tools/Block';

import { SIGN_IN_INPUT_FIELDS as signInInputs } from '../../lib/constants/formFieldConstants';

class SignInPage extends LoyautCenter {
  constructor(props: { content: ModalBlock }) {
    super({
      ...props,
      content: new ModalBlock({
        title: 'Войти',
        content: new Form({
          fields: signInInputs.map((item: InputProps) => ({
            field: new Input({ ...item }),
          })),
          formName: 'signin',
          actions: [
            {
              send: new Button({ text: 'Войти', type: 'submit' }),
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
    window.router.go(ROUTES_PATH.signup);
  }

  async handleSubmit(formData: Record<string, string>): Promise<void> {
    const data: TSignInRequest = {
      login: formData.login,
      password: formData.password,
    };

    try {
      await UserAuthController.login(data);
    } catch (error) {
      console.error('Login error:', error);
    }
  }
}

export default connect(({ isLoading, loginError }) => ({
  isLoading,
  loginError,
}))(SignInPage as typeof Block);
