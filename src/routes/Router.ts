/* eslint-disable no-underscore-dangle */
import Block from '../tools/Block';
import Route from './Route';

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

  // Приватный конструктор, который создает экземпляр класса и устанавливает историю и корневой селектор
  private constructor(rootQuery: string) {
    this.history = window.history;
    this._rootQuery = rootQuery;

    // console.log('Router = constructor');
  }

  // Статический метод для получения единственного экземпляра класса
  static getInstance(rootQuery: string): Router {
    if (!Router._instance) {
      Router._instance = new Router(rootQuery);
    }
    return Router._instance;
  }

  // Метод для добавления маршрута
  use(pathname: string, block: typeof Block): this {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  // Метод для запуска роутера
  start(): void {
    // Обработчик события изменения адреса страницы
    window.onpopstate = (event: PopStateEvent) => {
      if (event.currentTarget instanceof Window) {
        this._onRoute(event.currentTarget.location.pathname);
      }
    };
    this._onRoute(window.location.pathname);
  }

  // Приватный метод для обработки изменения маршрута
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

  // Метод для перехода по маршруту
  go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  // Метод для получения маршрута по указанному пути
  getRoute(pathname: string): Route | undefined {
    const foundRoute = this.routes.find((route) => route.match(pathname));
    if (!foundRoute) {
      return this._getNotFoundRoute();
    }
    return foundRoute;
  }

  // Приватный метод для получения маршрута по умолчанию для ошибки 404
  private _getNotFoundRoute(): Route {
    // Возвращаем маршрут с параметром '*', который обозначает ошибку 404
    const notFoundRoute = this.routes.find((route) => route.match('*'));
    if (!notFoundRoute) {
      throw new Error('Route with "*" not found');
    }
    return notFoundRoute;
  }
}

export default Router;
