// Интерфейсы для типов событий, атрибутов и дочерних элементов
import Block from '../tools/Block';

export interface EventMap {
  [key: string]: EventListenerOrEventListenerObject;
}

export interface Attributes {
  [key: string]: string;
}

export interface Children {
  [key: string]: Block;
}

export interface BlockProps {
  events?: EventMap;
  attr?: Attributes | false;
  template?: string;
}

export type PlainObject = Record<string, unknown>;
