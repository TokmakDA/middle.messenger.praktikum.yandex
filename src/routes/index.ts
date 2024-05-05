import Block from '../tools/Block';
import Router from './Router';
import * as Pages from '../pages';

// Добавим роуты
const routes: Record<string, Block> = {
  '/': Pages.homePage,
  '/signup': Pages.signUpPage,
  '/signin': Pages.signInPage,
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

// Объявление нового свойства router в глобальной области видимости
declare global {
  interface Window {
    router: Router;
  }
}

window.router = router;

export { router };
