import Block from '../../tools/Block';
import './style.scss';
import { Children } from '../../@types/block';

interface ModalBlockProps {
  className?: string;
  title?: string;
  content?: Block | Children[] | string;
  events?: {
    [key: string]: EventListenerOrEventListenerObject;
  };
}

class ModalBlock extends Block {
  constructor(props: ModalBlockProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          e.stopPropagation();
        },
      },
      template: `
        <div class="modal__container {{className}}">
          {{#if title }}
            <h1 class="modal__title">{{ title }}</h1>
          {{/if}}
          <div class="modal__content">
            {{{ content }}}
          </div>
        </div>
      `,
    });
  }
}

export default ModalBlock;
