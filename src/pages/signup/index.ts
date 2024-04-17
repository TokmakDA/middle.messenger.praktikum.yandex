import { InputProps } from '../../@types/types';
import AuthorizeBlock from '../../modules/authorize';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import LinkBlock from '../../components/link';
import LoyautCenterBlock from '../../layouts/center';

const inputsList: InputProps[] = [
  {
    type: 'text',
    name: 'login',
    label: 'Логин',
    value: 'ivanivanov',
    error: 'некорректный логин',
    required: true,
  },
  {
    type: 'text',
    name: 'first_name',
    label: 'Имя',
    value: 'Иван',
    required: true,
  },
  {
    type: 'text',
    name: 'second_name',
    label: 'Фамилия',
    value: 'Иванов',
    required: true,
  },
  {
    type: 'email',
    name: 'email',
    label: 'Почта',
    value: 'email@yandex.ru',
    required: true,
  },
  {
    type: 'phone',
    name: 'phone',
    label: 'Телефон',
    value: '+7(912)345-67-89',
    required: true,
  },
  {
    type: 'password',
    name: 'password',
    label: 'Пароль',
    value: 'qazwsx',
    required: true,
  },
  {
    type: 'password',
    name: 'rePassword',
    label: 'Повторите пароль',
    value: 'qazwsx',
    required: true,
  },
];

const signUpPage = new LoyautCenterBlock({
  content: new AuthorizeBlock({
    inputsList: inputsList.map((item) => ({
      input: new Input({ ...item }),
    })),
    title: 'Зарегистрироваться',
    formName: 'signup',
    button: new Button({ text: 'Войти', url: '/signin' }),
    link: new LinkBlock({ text: 'Зарегистрироваться ', type: 'submit' }),
  }),
});

export default signUpPage;
