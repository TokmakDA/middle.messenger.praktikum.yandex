import { InputField } from '../../@types/types';

export const SIGN_UP_INPUT_FIELDS: InputField[] = [
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
      pattern: '^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$',
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

export const SIGN_IN_INPUT_FIELDS: InputField[] = [
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

export const PROFILE_INPUT_FIELDS: InputField[] = [
  {
    type: 'text',
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
    type: 'text',
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
    type: 'text',
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
    type: 'text',
    name: 'display_name',
    label: 'Имя в чате',
    value: '',
    attr: {
      required: true,
      type: 'text',
      pattern: '^[A-ZА-Я]+[A-Za-zА-Яа-я\\-\\s]*',
    },
  },
  {
    type: 'email',
    name: 'email',
    label: 'Почта',
    value: '',
    attr: {
      type: 'email',
      required: true,
      pattern: '^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$',
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
];

export const PASS_INPUTS: InputField[] = [
  {
    type: 'password',
    name: 'oldPassword',
    label: 'Старый пароль',
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
    type: 'password',
    name: 'newPassword',
    label: 'Новый пароль',
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
    type: 'password',
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
