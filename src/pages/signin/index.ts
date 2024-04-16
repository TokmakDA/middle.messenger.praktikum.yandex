/* eslint-disable no-console */
import { InputProps } from '../../@types/types';
import AuthorizeBlock from '../../modules/authorize';
import { InputBlock } from '../../components/input';
import ButtonBlock from '../../components/button';
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
    type: 'password',
    name: 'password',
    label: 'Пароль',
    value: '',
    required: true,
  },
];

const signInPage = new LoyautCenterBlock({
  content: new AuthorizeBlock({
    inputsList: inputsList.map((item) => ({
      input: new InputBlock({
        ...item,
        onBlur: (e) => {
          console.log(e.target);
        },
        onClick: (e: any) => {
          console.log('onClick', e.target.value, e.target.name);
        },
      }),
    })),
    title: 'Войти',
    formName: 'signin',
    button: new ButtonBlock({ text: 'Войти', type: 'submit' }),
    link: new LinkBlock({ text: 'Зарегистрироваться', url: '/signup' }),
  }),
});

export default signInPage;
