/* eslint-disable no-console */
import Handlebars from 'handlebars';
import EventBus from './EventBus';

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
  attr?: Attributes;
  template?: string;
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
  protected id: string = this._generateRandomId();

  // Свойства компонента
  protected props: Props = {};

  // Дочерние компоненты
  protected children: Children = {};

  // Экземпляр EventBus для работы с событиями
  protected eventBus: () => EventBus;

  // Список дочерних компонентов
  protected lists: { [key: string]: Children[] } = {};

  // Шаблон
  protected template: string | undefined;

  constructor({ ...propsWithChildren }) {
    const eventBus = new EventBus(); // Создание нового экземпляра EventBus
    const { props, children, lists } =
      this._extractPropsAndChildren(propsWithChildren); // Извлечение свойств и дочерних компонентов
    this.props = this._makePropsProxy(props); // Проксирование свойств компонента
    this.children = children; // Установка дочерних компонентов
    this.lists = lists; // Установка списка дочерних компонентов
    this.template = this.props.template; // Установка шаблона
    this.eventBus = () => eventBus; // Установка экземпляра EventBus
    this._registerEvents(eventBus); // Регистрация событий
    eventBus.emit(Block.EVENTS.INIT); // Инициирование события INIT

    // // eslint-disable-next-line no-console
    // console.log(
    //   this,
    //   'this.id =>',
    //   this.id,
    //   'props => ',
    //   props,
    //   'children =>',
    //   children,
    //   'lists =>',
    //   lists,
    //   'this._element =>',
    //   this._element,
    // );
  }

  // Добавление обработчиков событий к элементу
  _addEvents(): void {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  // Регистрация обработчиков событий
  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  // Инициализация компонента
  init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // Извлечение свойств и дочерних компонентов
  // eslint-disable-next-line class-methods-use-this
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
        console.log(lists);
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  // Обработчик события "componentDidMount"
  _componentDidMount(): void {
    this.componentDidMount();
  }

  // Обновление свойств компонента
  // eslint-disable-next-line class-methods-use-this
  componentDidMount(oldProps?: object): void {
    // eslint-disable-next-line no-console
    console.log('componentDidUpdate => oldProps', oldProps);
  }

  // Инициирование события "FLOW_CDM"
  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  // Обновление компонента при изменении свойств
  _componentDidUpdate(oldProps: object, newProps: object): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  // Обработчик события "componentDidUpdate"
  // eslint-disable-next-line class-methods-use-this
  componentDidUpdate(oldProps: object, newProps: object): boolean {
    // eslint-disable-next-line no-console
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
    // console.log('_render', this);
    const propsAndStubs: Record<string, unknown> = { ...this.props };
    const listID = this._generateRandomId();
    // Заменяем в шаблоне дочерние компоненты на заполнители
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    // Заменяем в шаблоне дочерние компоненты на заполнители
    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="${listID}"></div>`;
    });

    // Компилируем шаблон, используя Handlebars и обновленные реквизиты
    const compiledTemplate = Handlebars.compile(this.render())(propsAndStubs);
    // Создаем фрагмент документа для работы с шаблоном
    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = compiledTemplate;

    // console.log(this, fragment, this.children);

    // Заменяем фрагмент на реальные дочерние компоненты
    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(
        // eslint-disable-next-line no-underscore-dangle
        `[data-id="${child.id}"]`,
      ) as HTMLElement;

      if (stub) {
        stub.replaceWith(child.getContent()!);
      }
    });

    // Заменяем фрагмент на реальные  на реальные дочерние компоненты из массива
    Object.values(this.lists).forEach((child) => {
      const stub = fragment.content.querySelector(
        `[data-id="${listID}"]`,
      ) as HTMLElement;
      const listCont = this._createDocumentElement('template');
      child.forEach((item) => {
        listCont.content.append(
          Object.values(item)[0].getContent() as HTMLElement,
        );
      });

      if (stub) {
        stub.replaceWith(listCont.content);
      }
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
  render(): string {
    if (this.template) {
      return this.template;
    }
    return '<div>Нет шаблона</div>';
  }

  // Получение содержимого компонента
  getContent(): HTMLElement | null {
    return this.element;
  }

  // Проксирование свойств компонента
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

        // Запускаем обновление компоненты
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
