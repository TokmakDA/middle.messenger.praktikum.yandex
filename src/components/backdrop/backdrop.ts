import Block from '../../tools/Block';

interface BackdropProps {
  className?: string;
  events?: {
    [key: string]: EventListenerOrEventListenerObject;
  };
  content?: Block;
}

class Backdrop extends Block {
  constructor(props: BackdropProps) {
    super({
      ...props,
      template: `
        <div class="backdrop {{#if className}} {{className}} {{/if}}">
          {{{ content }}}
        </div>
      `,
      children: {
        content: props.content,
      },
    });
  }
}

export default Backdrop;
