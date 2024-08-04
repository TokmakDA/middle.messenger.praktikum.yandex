import { InputProps } from '../../@types/types';
import { Input, Button, Link, AuthorizeWrapper, Form } from '../../components';
import { ROUTES_PATH } from '../../lib/constants/routes';
import { LoyautCenter } from '../../layouts';
import { UserAuthController } from '../../controllers';
import { TSignInRequest } from '../../@types/api';
import { connect } from '../../tools/connect';
import Block from '../../tools/Block';
import { SIGN_IN_INPUT_FIELDS as signInInputs } from '../../lib/constants/formFieldConstants';

class SignInPage extends LoyautCenter {
  constructor(props: { content: AuthorizeWrapper }) {
    super({
      ...props,
      content: new AuthorizeWrapper({
        title: 'Войти',
        form: new Form({
          inputsList: signInInputs.map((item: InputProps) => ({
            input: new Input({ ...item }),
          })),
          formName: 'signin',
          button: new Button({ text: 'Войти', type: 'submit' }),
          link: new Link({
            text: 'Зарегистрироваться',
            url: ROUTES_PATH.signup,
          }),
          onSubmit: (formData) => this.handleSubmit(formData),
        }),
      }),
    });
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
      // Handle error (e.g., show a message to the user)
    }
  }
}

export default connect(({ isLoading, loginError }) => ({
  isLoading,
  loginError,
}))(SignInPage as typeof Block);
