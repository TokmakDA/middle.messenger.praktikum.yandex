import { InputProps } from '../../@types/types';
import { Input, Button, Link, AuthorizeWrapper, Form } from '../../components';
import { ROUTES_PATH } from '../../lib/constants/routes';
import { LoyautCenter } from '../../layouts';
import { TSignUpRequest } from '../../@types/api';
import { UserAuthController } from '../../controllers/Auth.ts';
import Block from '../../tools/Block';
import { connect } from '../../tools/connect';
import { SIGN_UP_INPUT_FIELDS as signUpInputs } from '../../lib/constants/formFieldConstants';

class SignUpPage extends LoyautCenter {
  constructor(props: { content: AuthorizeWrapper }) {
    super({
      ...props,
      content: new AuthorizeWrapper({
        title: 'Зарегистрироваться',
        form: new Form({
          inputsList: signUpInputs.map((item: InputProps) => ({
            input: new Input({ ...item }),
          })),
          formName: 'signup',
          button: new Button({ text: 'Зарегистрироваться ', type: 'submit' }),
          link: new Link({ text: 'Войти', url: ROUTES_PATH.signin }),
          onSubmit: (formData) => this.handleSubmit(formData),
        }),
      }),
    });
  }

  async handleSubmit(formData: Record<string, string>): Promise<void> {
    const data: TSignUpRequest = {
      login: formData.login,
      password: formData.password,
      first_name: formData.first_name,
      second_name: formData.second_name,
      email: formData.email,
      phone: formData.phone,
    };

    try {
      await UserAuthController.signUp(data);
    } catch (error) {
      console.error('signUp error:', error);
    }
  }
}

export default connect(({ isLoading, loginError }) => ({
  isLoading,
  loginError,
}))(SignUpPage as typeof Block);
