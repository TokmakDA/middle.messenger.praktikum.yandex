export const MY_LOGIN = 'userLogin';

export const CHAT_LIST = [
  {
    id: 123,
    title: 'my-chat',
    avatar: '/123/avatar1.jpg',
    unread_count: 15,
    created_by: 12345,
    last_message: {
      user: {
        first_name: 'Petya',
        second_name: 'Pupkin',
        avatar: '/path/to/avatar.jpg',
        email: 'my@email.com',
        login: 'userPetya',
        phone: '8(911)-222-33-22',
      },
      time: '2024-01-10T14:22:22.000Z',
      content: 'this is message content',
    },
  },
  {
    id: 121,
    title: 'my-chat',
    avatar: '/123/avatar1.jpg',
    unread_count: 0,
    created_by: 12345,
    last_message: {
      user: {
        first_name: 'user',
        second_name: 'user',
        avatar: '/path/to/avatar.jpg',
        email: 'my@email.com',
        login: 'userLogin',
        phone: '8(911)-222-33-22',
      },
      time: '2024-02-17T14:22:22.000Z',
      content:
        'Друзья, у меня для вас особенный выпуск новостей! Ждем вас!!!!!!!!',
    },
    is_active: true,
  },
  {
    id: 120,
    title: 'chat',
    avatar: '/123/avatar1.jpg',
    unread_count: 0,
    created_by: 12345,
    last_message: {
      user: {
        first_name: 'user',
        second_name: 'user',
        avatar: '/path/to/avatar.jpg',
        email: 'my@email.com',
        login: 'userLogin',
        phone: '8(911)-222-33-22',
      },
      time: '2023-01-17T14:22:22.000Z',
      content:
        'Друзья, у меня для вас особенный выпуск новостей! Ждем вас!!!!!!!!',
    },
  },
];

export const PROFILE_INPUTS = [
  {
    type: 'text',
    name: 'login',
    label: 'Логин',
    value: 'ivanivanov',
    error: null,
    required: true,
  },
  {
    type: 'text',
    name: 'first_name',
    label: 'Имя',
    value: 'Иван',
    error: null,
    required: true,
  },
  {
    type: 'text',
    name: 'second_name',
    label: 'Фамилия',
    value: 'Иванов',
    error: null,
    required: true,
  },
  {
    type: 'text',
    name: 'display_name',
    label: 'Имя в чате',
    value: 'Иван Васильевич',
    error: null,
    required: true,
  },
  {
    type: 'email',
    name: 'email',
    label: 'Почта',
    value: 'email@yandex.ru',
    error: null,
    required: true,
  },
  {
    type: 'phone',
    name: 'phone',
    label: 'Телефон',
    value: '+7(912)345-67-89',
    error: null,
    required: true,
  },
];

export const PASS_INPUTS = [
  {
    type: 'password',
    name: 'oldPassword',
    label: 'Старый пароль',
    value: 'qazwsx',
    required: true,
  },
  {
    type: 'password',
    name: 'newPassword',
    label: 'Новый пароль',
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

export const PROFILE_LINKS = [
  { text: 'Изменить данные', url: '/profile-edit', natural: true },
  { text: 'Изменить пароль', url: '/profile-pass', natural: true },
  { text: 'Выйти', url: '/signin/', negative: true },
];
