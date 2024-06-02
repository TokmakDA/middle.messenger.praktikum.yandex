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
    // console.log(`Router = getInstance(${rootQuery}) => `);

    if (!Router._instance) {
      // console.log(`Router = getInstance(${rootQuery}) => !Router._instance`);

      Router._instance = new Router(rootQuery);
    }
    return Router._instance;
  }

  // Метод для добавления маршрута
  use(pathname: string, block: Block): this {
    // console.group('Router = use(pathname, block) =>', pathname);

    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    // console.log('pathname => ', pathname);
    // console.log('block => ', block);
    // console.groupEnd();
    return this;
  }

  // Метод для запуска роутера
  start(): void {
    // console.log('Router = start =>');

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
    // console.group('Router => _onRoute(pathname) => ', pathname);

    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    // console.log('route => ', route);
    if (this._currentRoute) {
      // console.log('this._currentRoute => leave()', this._currentRoute);
      this._currentRoute.leave();
    }

    // console.groupEnd();
    // route.render(route, pathname);
    route.render();
  }

  // Метод для перехода по маршруту
  go(pathname: string): void {
    // console.group('Router = go(pathname) =>', pathname);

    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);

    // console.log('this.history => ', this.history);
    // console.groupEnd();
  }

  // Метод для получения маршрута по указанному пути
  getRoute(pathname: string): Route | undefined {
    // console.group('Router = getRoute(pathname) =>', pathname);

    const foundRoute = this.routes.find((route) => route.match(pathname));

    if (!foundRoute) {
      // console.log('!route => ', foundRoute);
      // console.groupEnd();
      return this._getNotFoundRoute();
    }

    // console.log('route => ', foundRoute);
    // console.groupEnd();
    return foundRoute;
  }

  // Приватный метод для получения маршрута по умолчанию для ошибки 404
  private _getNotFoundRoute(): Route {
    // console.log('NotFoundRoute =>');

    // Возвращаем маршрут с параметром '*', который обозначает ошибку 404
    const notFoundRoute = this.routes.find((route) => route.match('*'));
    if (!notFoundRoute) {
      throw new Error('Route with "*" not found');
    }
    return notFoundRoute;
  }
}

export default Router;
