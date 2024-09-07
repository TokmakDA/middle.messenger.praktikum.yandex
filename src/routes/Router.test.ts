// eslint-disable-next-line max-classes-per-file
import { expect } from 'chai';
import sinon from 'sinon';
import Router from './Router';
import Block from '../tools/Block';
import Route from './Route';

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    // Создаем тестовые компоненты
    class TestBlock extends Block {
      render() {
        return `<div>Test Component</div>`;
      }
    }

    class ErrTestBlock extends Block {
      render() {
        return `<div>Err Component</div>`;
      }
    }

    // Инициализация роутера с маршрутом и 404-страницей
    router = Router.getInstance('#app');
    router.use('/test', TestBlock);
    router.use('*', ErrTestBlock);
    router.start();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should initialize the Router correctly as a singleton', () => {
    // Проверяем, что Router был инициализирован корректно
    expect(router).to.be.instanceOf(Router);
  });

  it('should navigate to the correct route and update the history state', () => {
    const pushStateSpy = sinon.spy(global.history, 'pushState');

    // Навигация к маршруту /test
    router.go('/test');

    // Проверяем, что pushState был вызван один раз с правильным путем
    expect(pushStateSpy.calledOnce).to.be.true;
  });

  it('should handle non-existent routes by rendering a 404 page', () => {
    const pushStateSpy = sinon.spy(global.history, 'pushState');

    // Попытка навигации к несуществующему маршруту
    router.go('/non-existent-route');

    // Проверяем, что роутер вызвал pushState и отобразил компонент 404
    expect(pushStateSpy.calledOnce).to.be.true;
    expect(document.body.innerHTML).to.contain('Err Component');
  });

  it('should navigate back in browser history when back() is called', () => {
    const historyBackSpy = sinon.spy(global.history, 'back');

    // Навигация и возврат назад по истории
    router.go('/test');
    router.back();

    // Проверяем, что history.back был вызван
    expect(historyBackSpy.calledOnce).to.be.true;
  });

  it('should navigate forward in browser history when forward() is called', () => {
    const historyForwardSpy = sinon.spy(global.history, 'forward');

    // Навигация и переход вперед по истории
    router.go('/test');
    router.forward();

    // Проверяем, что history.forward был вызван
    expect(historyForwardSpy.calledOnce).to.be.true;
  });

  it('should enforce Router as a singleton, ensuring only one instance exists', () => {
    // Проверка, что Router является синглтоном
    const newRouter = Router.getInstance('#app');
    expect(newRouter).to.equal(router);
  });

  it('should retrieve a route by its path using .getRoute()', () => {
    // Получаем маршрут по пути '/test'
    const route = router.getRoute('/test');

    // Проверяем, что возвращаемый маршрут является экземпляром Route
    expect(route instanceof Route).to.be.true;
  });
});
