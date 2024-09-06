/* eslint-disable no-underscore-dangle */
import type Block from '../tools/Block';
import Route from './Route';
import AuthManager from './AuthManager';

/**
 * Класс Router для управления маршрутами в приложении
 */
class Router {
  // Статическое свойство для хранения единственного экземпляра класса
  private static _instance: Router | null = null;
  // История браузера
  history: History;
  // Текущий маршрут
  private _currentRoute: Route | null = null;
  // Корневой селектор, в котором будет отрисовываться контент
  private readonly _rootQuery: string;

  // Массив всех маршрутов
  routes: Route[] = [];

  /**
   * Приватный конструктор, который создает экземпляр класса и устанавливает историю и корневой селектор
   * @param rootQuery - Корневой селектор для отрисовки контента
   */
  private constructor(rootQuery: string) {
    this.history = window.history;
    this._rootQuery = rootQuery;
  }

  /**
   * Статический метод для получения единственного экземпляра класса
   * @param rootQuery - Корневой селектор для отрисовки контента
   * @returns Единственный экземпляр Router
   */
  static getInstance(rootQuery: string): Router {
    if (!Router._instance) {
      Router._instance = new Router(rootQuery);
    }
    return Router._instance;
  }

  /**
   * Метод для добавления маршрута
   * @param pathname - Путь маршрута
   * @param block - Компонент, который будет отрисовываться для этого маршрута
   * @returns Текущий экземпляр Router для поддержки цепного вызова
   */
  use(pathname: string, block: typeof Block): this {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  /**
   * Метод для запуска роутера
   * Настраивает обработчик изменения адреса страницы и запускает начальный маршрут
   */
  start(): void {
    // Обработчик события изменения адреса страницы
    window.onpopstate = (event: PopStateEvent) => {
      if (event.currentTarget instanceof Window) {
        this._onRoute(event.currentTarget.location.pathname);
      }
    };
    this._onRoute(window.location.pathname);
  }

  /**
   * Приватный метод для обработки изменения маршрута
   * @param pathname - Новый путь маршрута
   */
  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }
    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    if (route) {
      route.render();
    }
  }

  /**
   * Метод для перехода по маршруту
   * @param pathname - Путь маршрута для перехода
   */
  go(pathname: string): void {
    AuthManager.protectRoute(pathname, this, () => {
      this.history.pushState({}, '', pathname);
      this._onRoute(pathname);
    });
  }

  /**
   * Переход назад по истории браузера
   */
  back() {
    this.history.back();
  }

  /**
   * Переход вперед по истории браузера
   */
  forward() {
    this.history.forward();
  }

  /**
   * Метод для получения маршрута по указанному пути
   * @param pathname - Путь маршрута
   * @returns Найденный маршрут или маршрут для ошибки 404
   */
  getRoute(pathname: string): Route | undefined {
    const foundRoute = this.routes.find((route) => route.match(pathname));
    if (!foundRoute) {
      return this._getNotFoundRoute();
    }
    return foundRoute;
  }

  /**
   * Приватный метод для получения маршрута по умолчанию для ошибки 404
   * @returns Маршрут для ошибки 404
   * @throws Ошибка, если маршрут с "*" не найден
   */
  private _getNotFoundRoute(): Route {
    const notFoundRoute = this.routes.find((route) => route.match('*'));
    if (!notFoundRoute) {
      throw new Error('Route with "*" not found');
    }
    return notFoundRoute;
  }
}

export default Router;
