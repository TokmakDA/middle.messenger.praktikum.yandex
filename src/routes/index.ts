import Block from '../tools/Block';
import Router from './Router';
import * as Pages from '../pages';
import { ROUTES_PATH } from '../lib/constants/routes';

// Добавим роуты
const routes: {
  [key: string]: typeof Block;
} = {
  [ROUTES_PATH.signin]: Pages.SignInPage,
  [ROUTES_PATH.signup]: Pages.SignUpPage,
  [ROUTES_PATH.profile]: Pages.ProfilePage,
  [ROUTES_PATH.chat]: Pages.ChatPage,
  [ROUTES_PATH.error5XX]: Pages.ErrorPage5XX,
  [ROUTES_PATH.error404]: Pages.ErrorPage404,
};

const router = Router.getInstance('#app');

Object.entries(routes).forEach(([pathname, block]) => {
  router.use(pathname, block);
});

// Объявление нового свойства router в глобальной области видимости
declare global {
  interface Window {
    router: Router;
  }
}

window.router = router;

export { router };
