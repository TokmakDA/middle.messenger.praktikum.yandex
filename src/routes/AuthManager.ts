import { ROUTES_PATH } from '../lib/constants/routes';
import store from '../services';
import type Router from './Router';
import { UserAuthController } from '../controllers/Auth.ts'; // Импорт вашего контроллера

/**
 * Менеджер авторизации и защиты маршрутов.
 * Управляет проверкой авторизации и перенаправлением в зависимости от состояния пользователя.
 */
class AuthManager {
  /**
   * Проверяет доступ к маршруту и перенаправляет в зависимости от состояния авторизации.
   * @param pathname Путь маршрута.
   * @param router Экземпляр роутера.
   * @param callback Функция для вызова, если маршрут доступен.
   */
  public static protectRoute(
    pathname: string,
    router: Router,
    callback: () => void,
  ) {
    const { isAuthorized } = store.getState();
    const isAuthPage =
      pathname === ROUTES_PATH.signin || pathname === ROUTES_PATH.signup;
    const isProtectedRoute =
      pathname !== ROUTES_PATH.signin && pathname !== ROUTES_PATH.signup;

    // Если не авторизован и пытается зайти на защищенный маршрут
    if (!isAuthorized && isProtectedRoute) {
      router.go(ROUTES_PATH.signin);
    } else if (isAuthorized && isAuthPage) {
      // Если авторизован и пытается зайти на страницу авторизации или регистрации
      router.go(ROUTES_PATH.chat);
    } else {
      callback();
    }
  }

  /**
   * Проверяет авторизацию пользователя при загрузке страницы.
   * Выполняет запрос для получения данных о текущем пользователе и обновляет состояние.
   * @param router Экземпляр роутера.
   */
  public static async checkAuthOnLoad(router: Router) {
    await UserAuthController.getUserMe();
    const { isAuthorized } = store.getState();
    const { pathname } = window.location;

    if (isAuthorized) {
      router.go(pathname);
    }
  }
}

export default AuthManager;
