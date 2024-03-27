import EventBus from './EventBus';

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _element: HTMLElement | null = null;

  private _meta: { tagName: string; props: object };

  private props: object;

  private eventBus: () => EventBus;

  constructor(tagName: string = 'div', props: object = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources(): void {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount(oldProps?: object): void {}

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: object, newProps: object): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: object, newProps: object): boolean {
    return true;
  }

  setProps = (nextProps: object): void => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    const block = this.render();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    if (this._element) {
      this._element.innerHTML = block;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  render(): string {
    return '';
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  private _makePropsProxy(props: object): object {
    const { eventBus } = this;
    return new Proxy(props, {
      get(target: { [key: string]: object }, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: { [key: string]: object }, prop: string, value: object) {
        // eslint-disable-next-line no-console
        console.log(target);

        const updateTarget = target;
        updateTarget[prop] = value;
        // eslint-disable-next-line no-console
        console.log(updateTarget);

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

  // eslint-disable-next-line class-methods-use-this
  private _createDocumentElement(tagName: string): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'block';
    }
  }

  hide(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  }
}
