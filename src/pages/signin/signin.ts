import { InputProps } from '../../@types/types';
import { Input, Button, Link, AuthorizeWrapper, Form } from '../../components';
import { LoyautCenter } from '../../layouts';

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

const signInPage = new LoyautCenter({
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
        url: '/signup',
        // events: {
        //   click: () => {
        //     window.router.go('/signup');
        //   },
        // },
      }),
    }),
  }),
});

export default signInPage;
