type TCallback = (...args: object[]) => void;
type TListeners = Record<string, TCallback[]>;

export default class EventBus {
  listeners: TListeners;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: TCallback): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: TCallback): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter((listener) => {
      return listener !== callback;
    });
  }

  emit(event: string, ...args: object[]): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
