const URLS = {
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
    users: (id: string | number) => `/chats/${id}/users`, // Получить пользователей чата
    modifyUsers: '/chats/users', // Добавить или удалить пользователей
    newMessagesCount: (id: string | number) => `/chats/new/${id}`, // Количество новых сообщений
    avatar: '/chats/avatar', // Загрузить аватар чата
    token: (id: string | number) => `/chats/token/${id}`, // Запрос токена для подключения к серверу сообщений
  },
};

export default URLS;
