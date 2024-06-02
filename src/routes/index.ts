import Block from '../tools/Block';
import Router from './Router';
import * as Pages from '../pages';
import { ROUTES_PATH } from '../lib/constants';

// Добавим роуты
const routes: Record<string, Block> = {
  [ROUTES_PATH.signin]: Pages.signInPage,
  [ROUTES_PATH.signup]: Pages.signUpPage,
  [ROUTES_PATH.profile]: Pages.profilePage,
  [ROUTES_PATH.chat]: Pages.chatPage,
  [ROUTES_PATH.error5XX]: Pages.erorrPage5XX,
  [ROUTES_PATH.error404]: Pages.erorrPage404,
};

const router = Router.getInstance('#app');

Object.entries(routes).forEach(([pathname, block]) => {
  router.use(pathname, block);
});

// console.log('routes => index.ts => router => ', router);

// Объявление нового свойства router в глобальной области видимости
declare global {
  interface Window {
    router: Router;
  }
}

window.router = router;

export { router };
