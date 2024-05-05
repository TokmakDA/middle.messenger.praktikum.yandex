import Block from '../tools/Block';
import Router from './Router';
import * as Pages from '../pages';

// Добавим роуты
const routes: Record<string, Block> = {
  '/': Pages.homePage,
  '/signin': Pages.signInPage,
  '/signup': Pages.signUpPage,
  '/profile': Pages.profilePage,
  '/chats': Pages.chatPage,
  '/500': Pages.erorrPage5XX,
  '*': Pages.erorrPage404, // '/404': erorrPage404,
};

const router = Router.getInstance('#app');
Object.entries(routes).forEach(([pathname, block]) => {
  router.use(pathname, block);
});

// // eslint-disable-next-line no-console
// console.log('routes => index.ts => router => ', router);

export { router };
