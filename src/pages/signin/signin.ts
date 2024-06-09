import { InputProps } from '../../@types/types';
import { Input, Button, Link, AuthorizeWrapper, Form } from '../../components';
import { ROUTES_PATH } from '../../lib/constants';
import { LoyautCenter } from '../../layouts';
import { UserAuthController } from '../../controllers/auth';
import { TSignInRequest } from '../../@types/api';
import { connect } from '../../tools/connect';
import Block from '../../tools/Block';


const inputsList: InputProps[] = [
  {
    label: 'Логин',
    name: 'login',
    value: '',
    attr: {
      type: 'text',
      required: true,
      pattern: `(?=.*[a-z]|[A-Z])[a-zA-Z0-9\\-_]{3,20}`,
      minlength: 3,
      maxlength: 20,
    },
  },
  {
    label: 'Пароль',
    name: 'password',
    value: '',
    attr: {
      type: 'password',
      required: true,
      pattern: `((?=.*\\d)(?=.*[A-Z]).{8,40})`,
      minlength: 8,
      maxlength: 40,
    },
  },
];

class SignInPage extends LoyautCenter {
  constructor(props: { content: AuthorizeWrapper }) {
    super({
      ...props,
      content: new AuthorizeWrapper({
        title: 'Войти',
        form: new Form({
          inputsList: inputsList.map((item) => ({
            input: new Input({ ...item }),
          })),
          formName: 'signin',
          button: new Button({ text: 'Войти', type: 'submit' }),
          link: new Link({
            text: 'Зарегистрироваться',
            url: ROUTES_PATH.signup,
          }),
          onSubmit: async (formData) => {
            const data: TSignInRequest = {
              login: formData.login,
              password: formData.password,
            };
            await UserAuthController.login(data);
          },
        }),
      }),
    });
  }
}

export default connect(({ isLoading, loginError }) => ({
  isLoading,
  loginError,
}))(SignInPage as typeof Block);
