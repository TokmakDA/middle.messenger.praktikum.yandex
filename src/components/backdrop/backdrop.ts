import Block from '../../tools/Block';
import './style.scss';

interface BackdropProps {
  className?: string;
  events?: {
    [key: string]: EventListenerOrEventListenerObject;
  };
  content?: Block;
  isOpen: boolean;
  handleClose?: (e: Event) => void;
}

class Backdrop extends Block {
  constructor(props: BackdropProps) {
    super({
      ...props,
      children: {
        content: props.content,
      },
    });
  }

  render() {
    return `
      <div class="backdrop {{#if className}} {{className}} {{/if}} {{#if isOpen}} open {{/if}}">
        {{{ content }}}
      </div>
    `;
  }
}

export default Backdrop;
