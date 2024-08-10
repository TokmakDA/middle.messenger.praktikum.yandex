import Block from '../../tools/Block';

interface SVGBlockProps {
  attr?: {
    [key: string]: string;
  };
  events?: {
    [key: string]: EventListenerOrEventListenerObject;
  };
  template?: string;
  [key: string]: unknown;
}

class SVGBlock extends Block {
  constructor(props: SVGBlockProps) {
    // Передаем шаблон и атрибуты в конструктор родительского класса
    super({
      ...props,
      attr: props.attr,
    });
  }

  render(): string {
    // Используем переданный шаблон или стандартный SVG
    return this.props.template || ``;
  }
}

export default SVGBlock;
