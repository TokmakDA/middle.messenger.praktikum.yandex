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

// TODO Вынести инпуты и аттрибуты в отдельную переменную
export const PROFILE_INPUTS = [
  {
    type: 'text',
    name: 'login',
    label: 'Логин',
    value: 'ivanivanov',
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
    value: 'Иван',
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
    value: 'Иванов',
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
    value: 'Иван Васильевич',
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
    value: 'email@yandex.ru',
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
    value: '+79123456789',
    attr: {
      type: 'phone',
      required: true,
      pattern: '^[\\+]?[0-9]{10,15}',
      minlength: 10,
      maxlength: 15,
    },
  },
];

export const PASS_INPUTS = [
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

export const PROFILE_LINKS = [
  { text: 'Изменить данные', url: '/profile-edit', natural: true },
  { text: 'Изменить пароль', url: '/profile-pass', natural: true },
  { text: 'Выйти', url: '/signin', negative: true },
];
