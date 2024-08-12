import Handlebars from 'handlebars';
import EventBus from './EventBus';
import { isEqual } from '../lib/utils/utils';
import { BlockProps, Children, PlainObject } from '../@types/block';

/**
 * Основной класс Block для работы с компонентами
 */
export default class Block<T extends BlockProps = BlockProps> {
  [key: string]: unknown;
  // События жизненного цикла компонента
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  };
  private _isMounted: boolean = false;
  private _element: HTMLElement | null = null;
  protected id: string = this._generateRandomId();
  protected eventBus: EventBus;
  protected template: string | undefined;
  props: BlockProps = {} as T;
  children: Children = {};
  lists: { [key: string]: Children[] } = {};

  /**
   * Конструктор класса Block
   * @param propsWithChildren - Свойства и дочерние элементы компонента
   */
  constructor({ ...propsWithChildren }) {
    this.eventBus = new EventBus();
    const { props, children, lists } =
      this._extractPropsAndChildren(propsWithChildren);
    this.props = this._makePropsProxy(props);
    this.children = children;
    this.lists = lists;
    this.template = this.props.template;
    this._registerEvents();
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  /**
   * Добавляет события на элемент компонента
   */
  _addEvents(): void {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  /**
   * Удаляет события с элемента компонента
   */
  _removeEvents() {
    const { events } = this.props;
    if (!events) {
      return;
    }
    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  /**
   * Регистрирует обработчики событий жизненного цикла компонента
   */
  _registerEvents(): void {
    this.eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this),
    );
    this.eventBus.on(
      Block.EVENTS.FLOW_CWU,
      this._componentWillUnmount.bind(this),
    );
    this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  /**
   * Инициализация компонента
   */
  _init(): void {
    this.init();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  /**
   * Переопределяемый метод инициализации компонента
   */
  init(): void {
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }
  /**
   * Извлекает пропсы и дочерние элементы из переданных данных
   * @param propsAndChildren - Свойства и дочерние элементы компонента
   * @returns Объект с пропсами, дочерними элементами и списками
   */
  _extractPropsAndChildren(propsAndChildren: { [s: string]: unknown }) {
    const children: Children = {};
    const props: { [key: string]: unknown } = {};
    const lists: { [key: string]: Children[] } = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (
        Array.isArray(value) &&
        value.some((item) => Object.values(item)[0] instanceof Block)
      ) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  /**
   * Обрабатывает событие монтирования компонента
   */
  _componentDidMount(): void {
    if (!this._isMounted) {
      this._isMounted = true;
      this.componentDidMount();

      // Монтируем дочерние компоненты
      Object.values(this.children).forEach((child) => {
        child.dispatchComponentDidMount();
      });

      Object.values(this.lists).forEach((childList) => {
        Object.values(childList).forEach((children) =>
          Object.values(children).forEach((child) => {
            child.dispatchComponentDidMount();
          }),
        );
      });
    }
  }

  /**
   * Переопределяемый метод для обработки монтирования компонента
   */
  componentDidMount(): void {}

  /**
   * Вызывает обработку монтирования компонента
   */
  dispatchComponentDidMount(): void {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  /**
   * Обрабатывает обновление компонента
   * @param oldProps - Старые пропсы
   * @param newProps - Новые пропсы
   */
  _componentDidUpdate(oldProps?: object, newProps?: object): void {
    const shouldRender = this.componentDidUpdate(oldProps, newProps);
    if (shouldRender) {
      this._render();
    }
  }

  /**
   * Переопределяемый метод для обработки обновления компонента
   * @param oldProps - Старые пропсы
   * @param newProps - Новые пропсы
   * @returns Нужно ли перерисовывать компонент
   */
  componentDidUpdate(oldProps?: object, newProps?: object): boolean {
    return !isEqual(oldProps, newProps);
  }

  /**
   * Обрабатывает размонтирование компонента
   */
  _componentWillUnmount() {
    this.componentWillUnmount();
    // Обработка дочерних компонентов
    Object.values(this.children).forEach((child) => {
      // console.log(`Unmounting child ${child.id}`);
      child.unmount();
    });

    // Обработка элементов в массиве lists
    Object.values(this.lists).forEach((childList) => {
      Object.values(childList).forEach((children) =>
        Object.values(children).forEach((child) => {
          // console.log(`Unmounting child ${child.id}`);
          child.unmount();
        }),
      );
    });

    this._removeEvents();
    this._element?.remove();
  }

  /**
   * Переопределяемый метод для обработки размонтирования компонента
   */
  componentWillUnmount() {}

  /**
   * Вызывает обработку размонтирования компонента
   */
  unmount() {
    this.eventBus.emit(Block.EVENTS.FLOW_CWU);
  }

  /**
   * Устанавливает новые пропсы, детей и списки детей и вызывает обновление компонента
   * @param nextPropsAndChildren - Новые пропсы и дети
   */
  setPropsAndChildren = (nextPropsAndChildren: PlainObject): void => {
    if (!nextPropsAndChildren) {
      return;
    }

    const newData = this._extractPropsAndChildren(nextPropsAndChildren);
    const oldPropsState: PlainObject = {};
    const newPropsState: PlainObject = {};

    Object.entries(newData).forEach(([k, v]) => {
      const key = k as keyof this;

      if (v && Object.keys(v).length) {
        // Приведение текущего значения к типу, основанному на типе ключа
        const oldProps = this[key];
        // Обновляем свойство только если типы совместимы
        if (typeof oldProps === 'object' && typeof v === 'object') {
          this[key] = { ...oldProps, ...v } as this[keyof this];
        }

        oldPropsState[key as keyof PlainObject] = oldProps;
        newPropsState[key as keyof PlainObject] = this[key];
      }
    });
    this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldPropsState, newPropsState);
  };

  /**
   * Возвращает HTML-элемент компонента
   */
  get element(): HTMLElement {
    return this._element!;
  }

  /**
   * Отрисовывает компонент
   */
  _render() {
    const propsAndStubs: Record<string, unknown> = { ...this.props };
    const listID = this._generateRandomId();

    // Замена дочерних элементов и списков на заглушки
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="${listID}"></div>`;
    });

    const compiledTemplate = Handlebars.compile(this.render())(propsAndStubs);
    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = compiledTemplate;

    // Замена заглушек на реальные элементы
    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(
        `[data-id="${child.id}"]`,
      ) as HTMLElement;
      if (stub) {
        stub.replaceWith(child.getContent()!);
      }
    });

    Object.values(this.lists).forEach((childList) => {
      const stub = fragment.content.querySelector(
        `[data-id="${listID}"]`,
      ) as HTMLElement;
      if (stub) {
        const elements = childList
          .map((children) =>
            Object.values(children).map((child) => child.getContent()),
          )
          .flat();

        stub.replaceWith(...elements);
      }
    });

    this._removeEvents();
    const newElement = fragment.content.firstElementChild as HTMLElement;

    // Установка атрибутов для нового элемента
    if (newElement && this.props.attr) {
      Object.entries(this.props.attr).forEach(([key, value]) => {
        newElement.setAttribute(key, value);
      });
    }
    if (this._element) {
      this._element.replaceWith(newElement!);
    }
    this._element = newElement;
    this._addEvents();

    // console.log(this.element);
  }

  /**
   * Возвращает HTML-шаблон компонента
   */
  render(): string {
    return this.template || '<div>Нет шаблона</div>';
  }

  /**
   * Возвращает контент компонента
   */
  getContent() {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.dispatchComponentDidMount();
        }
      }, 100);
    }

    return this.element;
  }

  /**
   * Создает прокси для пропсов компонента
   * @param props - Пропсы компонента
   * @returns Прокси объект
   */
  _makePropsProxy(props: object): BlockProps {
    const self = this as Block<T>;
    return new Proxy(props, {
      get(target: { [key: string]: object }, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: { [key: string]: object }, prop: string, value: object) {
        const updateTarget = target;
        updateTarget[prop] = value;
        self.eventBus.emit(
          Block.EVENTS.FLOW_CDU,
          { ...updateTarget },
          updateTarget,
        );
        return true;
      },
      deleteProperty() {
        throw new Error('Access denied');
      },
    });
  }

  /**
   * Создает HTML-элемент с указанным тегом
   * @param tagName - Название тега
   * @returns Созданный элемент
   */
  _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  /**
   * Генерирует случайный ID
   * @returns Случайный ID
   */
  _generateRandomId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
