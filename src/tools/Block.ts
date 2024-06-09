/* eslint-disable no-console */
import Handlebars from 'handlebars';
import EventBus from './EventBus';
import { isEqual } from './utils';

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

export default class Block {
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

  _addEvents(): void {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events } = this.props;
    if (!events) {
      return;
    }
    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

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

  _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount(): void {}

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: object, newProps: object): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: object, newProps: object): boolean {
    return !isEqual(oldProps, newProps);
  }

  _componentWillUnmount() {
    this.componentWillUnmount();
    this._removeEvents();
    this._element?.remove();
  }

  componentWillUnmount() {}

  unmount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CWU);
  }

  setProps = (nextProps: object): void => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement {
    return this._element!;
  }

  _render() {
    const propsAndStubs: Record<string, unknown> = { ...this.props };
    const listID = this._generateRandomId();

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="${listID}"></div>`;
    });

    const compiledTemplate = Handlebars.compile(this.render())(propsAndStubs);
    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = compiledTemplate;

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(
        `[data-id="${child.id}"]`,
      ) as HTMLElement;
      if (stub) {
        stub.replaceWith(child.getContent()!);
      }
    });

    Object.values(this.lists).forEach((child) => {
      const stub = fragment.content.querySelector(
        `[data-id="${listID}"]`,
      ) as HTMLElement;
      const childElement = this._createDocumentElement('template').content;
      child.forEach((item) => {
        childElement.append(Object.values(item)[0].getContent() as HTMLElement);
      });

      if (stub) {
        stub.replaceWith(childElement);
      }
    });

    this._removeEvents();
    const newElement = fragment.content.firstElementChild as HTMLElement;

    if (newElement && this.props.attr) {
      Object.entries(this.props.attr).forEach(([key, value]) => {
        newElement.setAttribute(key, value);
      });
    }
    if (this._element) {
      // newElement.style.display = this._element.style.display;
      this._element.replaceWith(newElement!);
    }
    this._element = newElement;
    this._addEvents();
  }

  render(): string {
    if (this.template) {
      return this.template;
    }
    return '<div>Нет шаблона</div>';
  }

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

  _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  _generateRandomId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  // show() {
  //   this.getContent()!.style.display = 'block';
  // }
  //
  // hide() {
  //   this.getContent()!.style.display = 'none';
  // }
}
