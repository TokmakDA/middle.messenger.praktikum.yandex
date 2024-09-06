import Block from '../tools/Block';
import Router from './Router';
import * as Pages from '../pages';
import { ROUTES_PATH } from '../lib/constants/routes';
import { BaseController } from '../controllers/BaseController';
import RouteManager from './RouteManager';

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

BaseController.setRouter(router);
RouteManager.setRouter(router);

export { router };
