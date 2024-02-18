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
