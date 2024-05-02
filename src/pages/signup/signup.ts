import { InputProps } from '../../@types/types';
import { Input, Button, Link, AuthorizeWrapper, Form } from '../../components';
import { LoyautCenter } from '../../layouts';

// TODO Вынести инпуты и аттрибуты в отдельную переменную
const inputsList: InputProps[] = [
  {
    name: 'login',
    label: 'Логин',
    value: '',
    attr: {
      type: 'text',
      required: true,
      pattern: '(?=.*[a-z]|[A-Z])[a-zA-Z0-9\\-_]{3,20}',
      minlength: 3,
      maxlength: 20,
    },
  },
  {
    name: 'first_name',
    label: 'Имя',
    value: '',
    attr: {
      type: 'text',
      required: true,
      pattern: '^[A-ZА-Я]+[A-Za-zА-Яа-я\\-]*',
    },
  },
  {
    name: 'second_name',
    label: 'Фамилия',
    value: '',
    attr: {
      type: 'text',
      required: true,
      pattern: '^[A-ZА-Я]+[A-Za-zА-Яа-я\\-]*',
    },
  },
  {
    name: 'email',
    label: 'Почта',
    value: '',
    attr: {
      type: 'email',
      required: true,
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
      minlength: 3,
      maxlength: 20,
    },
  },
  {
    type: 'phone',
    name: 'phone',
    label: 'Телефон',
    value: '',
    attr: {
      type: 'phone',
      required: true,
      pattern: '^[\\+]?[0-9]{10,15}',
      minlength: 10,
      maxlength: 15,
    },
  },
  {
    name: 'password',
    label: 'Пароль',
    value: '',
    attr: {
      type: 'password',
      required: true,
      pattern: '((?=.*\\d)(?=.*[A-Z]).{8,40})',
      minlength: 8,
      maxlength: 40,
    },
  },
  {
    name: 'rePassword',
    label: 'Повторите пароль',
    value: '',
    attr: {
      type: 'password',
      required: true,
      pattern: '((?=.*\\d)(?=.*[A-Z]).{8,40})',
      minlength: 8,
      maxlength: 40,
    },
  },
];

const signUpPage = new LoyautCenter({
  content: new AuthorizeWrapper({
    title: 'Зарегистрироваться',
    form: new Form({
      inputsList: inputsList.map((item) => ({
        input: new Input({ ...item }),
      })),
      formName: 'signup',
      button: new Button({ text: 'Зарегистрироваться ', type: 'submit' }),
      link: new Link({ text: 'Войти', url: '/signin' }),
    }),
  }),
});

export default signUpPage;
