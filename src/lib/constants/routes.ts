export const ROUTES = [
  { url: '/', name: 'Home' },
  { url: '/signin', name: 'signin' },
  { url: '/signup', name: 'signup' },
  { url: '/profile', name: 'profile' },
  { url: '/chats', name: 'chats' },
  { url: '/404', name: '404' },
  { url: '/500', name: '500' },
];

export const ROUTES_PATH = {
  signin: '/',
  signup: '/sign-up',
  profile: '/settings',
  chat: '/messenger',
  error5XX: '/500',
  error404: '*',
};
