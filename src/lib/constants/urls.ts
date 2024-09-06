import { WebSocketConnect } from '../../@types/socket';

const URLS = {
  base: 'https://ya-praktikum.tech/api/v2',
  ws: ({ userId, chatId, token }: WebSocketConnect) => {
    return `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;
  },
  auth: {
    signin: '/auth/signin',
    signup: '/auth/signup',
    user: '/auth/user',
    logout: '/auth/logout',
  },
  users: {
    search: '/user/search',
    password: '/user/password',
    avatar: '/user/profile/avatar',
    profile: '/user/profile',
    user: (id: string | number) => `/user/${id}`,
  },
  chats: {
    base: '/chats', // Использовать для GET, POST и DELETE
    users: (chatId: string | number) => `/chats/${chatId}/users`, // Получить пользователей чата
    modifyUsers: '/chats/users', // Добавить или удалить пользователей
    newMessagesCount: (chatId: string | number) => `/chats/new/${chatId}`, // Количество новых сообщений
    avatar: '/chats/avatar', // Загрузить аватар чата
    token: (id: string | number) => `/chats/token/${id}`, // Запрос токена для подключения к серверу сообщений
  },
  resources: '/resources', // Маршрут для получения ресурсов, добавляется перед url файлов
};

export default URLS;
