import { InputProps } from '../../@types/types';
import { Input, Button, Form, ModalBlock } from '../../components';
import { ROUTES_PATH } from '../../lib/constants/routes';
import { LoyautCenter } from '../../layouts';
import { TSignUpRequest } from '../../@types/api';
import { UserAuthController } from '../../controllers';
import Block from '../../tools/Block';
import { connect } from '../../tools/connect';
import { SIGN_UP_INPUT_FIELDS as signUpInputs } from '../../lib/constants/formFieldConstants';

class SignUpPage extends LoyautCenter {
  constructor(props: { content: ModalBlock }) {
    super({
      ...props,
      content: new ModalBlock({
        title: 'Зарегистрироваться',
        content: new Form({
          fields: signUpInputs.map((item: InputProps) => ({
            fields: new Input({ ...item }),
          })),
          formName: 'signup',
          actions: [
            {
              send: new Button({
                flat: true,
                text: 'Зарегистрироваться ',
                type: 'submit',
              }),
            },
            {
              link: new Button({
                text: 'Войти',
                className: 'link',
                page: 'signup',
                events: {
                  click: (e) => this.handleSignUp(e),
                },
              }),
            },
          ],
          onSubmit: (formData) => this.handleSubmit(formData),
        }),
      }),
    });
  }

  handleSignUp(e: Event) {
    e.preventDefault();
    window.router.go(ROUTES_PATH.signin);
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

    await UserAuthController.signUp(data);
  }
}

export default connect(({ isLoading }) => ({
  isLoading,
}))(SignUpPage as typeof Block);
