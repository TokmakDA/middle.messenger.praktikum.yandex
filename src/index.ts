import './assets/styles/index.scss';
import { router } from './routes';
import store from './services';
import AuthManager from './routes/AuthManager';

window.store = store;

// Проверка авторизации при старте приложения
AuthManager.checkAuthOnLoad(router).then(() => {
  router.start();
});
