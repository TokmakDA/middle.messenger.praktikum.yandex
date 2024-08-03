/* eslint-disable no-console */
import Handlebars from 'handlebars';
import EventBus from './EventBus';
import { isEqual } from '../lib/utils/utils';

// Интерфейсы для типов событий, атрибутов и дочерних элементов
interface EventMap {
  [key: string]: EventListenerOrEventListenerObject;
}

interface Attributes {
  [key: string]: string;
}

interface Children {
  [key: string]: Block;
}

interface Props {
  events?: EventMap;
  attr?: Attributes | false;
  template?: string;
}

/**
 * Основной класс Block для работы с компонентами
 */
export default class Block {
  // События жизненного цикла компонента
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  };
  private _element: HTMLElement | null = null;
  protected id: string = this._generateRandomId();
  protected props: Props = {};
  protected children: Children = {};
  protected eventBus: () => EventBus;
  protected lists: { [key: string]: Children[] } = {};
  protected template: string | undefined;

  /**
   * Конструктор класса Block
   * @param propsWithChildren - Свойства и дочерние элементы компонента
   */
  constructor({ ...propsWithChildren }) {
    const eventBus = new EventBus();
    const { props, children, lists } =
      this._extractPropsAndChildren(propsWithChildren);
    this.props = this._makePropsProxy(props);
    this.children = children;
    this.lists = lists;
    this.template = this.props.template;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
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
   * @param eventBus - Экземпляр EventBus
   */
  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  /**
   * Инициализация компонента
   */
  init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
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
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  /**
   * Переопределяемый метод для обработки монтирования компонента
   */
  componentDidMount(): void {}

  /**
   * Вызывает обработку монтирования компонента
   */
  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  /**
   * Обрабатывает обновление компонента
   * @param oldProps - Старые пропсы
   * @param newProps - Новые пропсы
   */
  _componentDidUpdate(oldProps: object, newProps: object): void {
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
  componentDidUpdate(oldProps: object, newProps: object): boolean {
    return !isEqual(oldProps, newProps);
  }

  /**
   * Обрабатывает размонтирование компонента
   */
  _componentWillUnmount() {
    this.componentWillUnmount();
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
    this.eventBus().emit(Block.EVENTS.FLOW_CWU);
  }

  /**
   * Устанавливает новые пропсы и вызывает обновление компонента
   * @param nextProps - Новые пропсы
   */
  setProps = (nextProps: object): void => {
    if (!nextProps) {
      return;
    }
    const oldProps = { ...this.props };
    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
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
      const childElement = this._createDocumentElement('template').content;
      childList.forEach((child) => {
        childElement.append(
          Object.values(child)[0].getContent() as HTMLElement,
        );
      });

      if (stub) {
        stub.replaceWith(childElement);
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
  _makePropsProxy(props: object): Props {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return new Proxy(props, {
      get(target: { [key: string]: object }, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: { [key: string]: object }, prop: string, value: object) {
        const updateTarget = target;
        updateTarget[prop] = value;
        self
          .eventBus()
          .emit(Block.EVENTS.FLOW_CDU, { ...updateTarget }, updateTarget);
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
