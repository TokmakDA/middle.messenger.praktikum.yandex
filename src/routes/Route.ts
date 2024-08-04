import Block from '../tools/Block';
import renderDOM from '../tools/renderDOM';

/**
 * Класс Route для управления маршрутом и его рендерингом
 */
export default class Route {
  // Путь маршрута
  private _pathname: string;
  // Компонент, который будет отображаться для этого маршрута
  private _block: Block | null = null;
  // Класс компонента, который будет отображаться для этого маршрута
  private readonly _blockClass: typeof Block;
  // Свойства маршрута
  private readonly _props: { rootQuery: string };

  /**
   * Конструктор маршрута
   * @param pathname - Путь маршрута
   * @param blockClass - Класс компонента, который будет отображаться для этого маршрута
   * @param props - Свойства маршрута
   */
  constructor(
    pathname: string,
    blockClass: typeof Block,
    props: { rootQuery: string },
  ) {
    this._pathname = pathname;
    this._blockClass = blockClass;
    this._block = null;
    this._props = props;
  }

  /**
   * Навигация к новому пути и рендеринг маршрута, если путь совпадает
   * @param pathname - Новый путь маршрута
   */
  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  /**
   * Очистка текущего блока и его размонтирование
   */
  leave() {
    if (this._block) {
      console.log('leave => this._block', this._block)
      this._block.unmount();
      this._block = null;
    }
  }

  /**
   * Проверка, совпадает ли путь с текущим маршрутом
   * @param pathname - Путь для проверки
   * @returns true, если путь совпадает, иначе false
   */
  match(pathname: string) {
    return pathname === this._pathname;
  }

  /**
   * Рендеринг маршрута
   */
  render() {
    if (!this._block) {
      this._block = new this._blockClass({});
    }
    renderDOM(this._props.rootQuery, this._block!);
    this._block.dispatchComponentDidMount();
  }
}
