/* eslint-disable no-console */
import Handlebars from 'handlebars'; // Импорт библиотеки Handlebars для работы с шаблонами
import EventBus from './EventBus'; // Импорт класса EventBus для работы с событиями

interface EventMap {
  [key: string]: EventListenerOrEventListenerObject; // Интерфейс для определения структуры событий
}

interface Attributes {
  [key: string]: string; // Интерфейс для определения атрибутов
}

interface Props {
  events?: EventMap; // Интерфейс для определения свойств компонента
  attr?: Attributes;
}

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  // Элемент, к которому привязан компонент
  protected _element: HTMLElement | null = null;

  // Уникальный идентификатор компонента
  protected _id: string = this._generateRandomId();

  // Свойства компонента
  protected props: Props = {};

  // Дочерние компоненты
  protected children: Record<string, Block> = {};

  // Экземпляр EventBus для работы с событиями
  protected eventBus: () => EventBus;

  constructor(propsWithChildren = {}) {
    const eventBus = new EventBus(); // Создание нового экземпляра EventBus
    const { props, children } =
      this._extractPropsAndChildren(propsWithChildren); // Извлечение свойств и дочерних компонентов
    this.props = this._makePropsProxy({ ...props }); // Проксирование свойств компонента
    this.children = children; // Установка дочерних компонентов
    this.eventBus = () => eventBus; // Установка экземпляра EventBus
    this._registerEvents(eventBus); // Регистрация событий
    eventBus.emit(Block.EVENTS.INIT); // Инициирование события INIT
  }

  // Добавление обработчиков событий к элементу
  _addEvents(): void {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  // Регистрация обработчиков событий
  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  // Инициализация компонента
  private init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // Извлечение свойств и дочерних компонентов
  // eslint-disable-next-line class-methods-use-this
  private _extractPropsAndChildren(
    propsAndChildren: { [s: string]: unknown } | ArrayLike<unknown>,
  ) {
    const children: { [key: string]: Block } = {};
    const props: { [key: string]: unknown } = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  // Обработчик события "componentDidMount"
  private _componentDidMount(): void {
    this.componentDidMount();
  }

  // Обновление свойств компонента
  // eslint-disable-next-line class-methods-use-this
  componentDidMount(oldProps?: object): void {
    console.log('componentDidUpdate => oldProps', oldProps);
  }

  // Инициирование события "FLOW_CDM"
  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  // Обновление компонента при изменении свойств
  private _componentDidUpdate(oldProps: object, newProps: object): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  // Обработчик события "componentDidUpdate"
  // eslint-disable-next-line class-methods-use-this
  componentDidUpdate(oldProps: object, newProps: object): boolean {
    console.log('componentDidUpdate =>', oldProps, newProps);
    return true;
  }

  // Установка новых свойств компонента
  setProps = (nextProps: object): void => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  // Получение элемента компонента
  get element(): HTMLElement {
    return this._element!;
  }

  // Рендеринг компонента
  _render() {
    const propsAndStubs: Record<string, unknown> = { ...this.props };

    // Заменяем в шаблоне дочерние компоненты на заполнители
    Object.entries(this.children).forEach(([key, child]) => {
      // eslint-disable-next-line no-underscore-dangle
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    // Компилируем шаблон, используя Handlebars и обновленные реквизиты
    const compiledTemplate = Handlebars.compile(this.render())(propsAndStubs);
    // Создаем фрагмент документа для работы с шаблоном
    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = compiledTemplate;

    // Заменяем фрагмент на реальные дочерние компоненты
    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(
        // eslint-disable-next-line no-underscore-dangle
        `[data-id="${child._id}"]`,
      ) as HTMLElement;
      stub.replaceWith(child.getContent()!);
    });

    // Заменяем текущий элемент на обновленный
    const newElement = fragment.content.firstElementChild;
    if (this._element) {
      this._element.replaceWith(newElement!);
    }
    this._element = newElement as HTMLElement;

    // Добавляем слушателей событий в новый элемент
    this._addEvents();
  }

  // Генерация шаблона компонента
  // eslint-disable-next-line class-methods-use-this
  render(): string {
    return '';
  }

  // Получение содержимого компонента
  getContent(): HTMLElement | null {
    return this.element;
  }

  // Проксирование свойств компонента
  _makePropsProxy(props: object): object {
    const { eventBus } = this;
    return new Proxy(props, {
      get(target: { [key: string]: object }, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: { [key: string]: object }, prop: string, value: object) {
        const updateTarget = target;
        updateTarget[prop] = value;

        // Запускаем обновление компоненты
        eventBus().emit(
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

  // Создание элемента документа
  // eslint-disable-next-line class-methods-use-this
  _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  // Генерация случайного идентификатора
  // eslint-disable-next-line class-methods-use-this
  _generateRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
