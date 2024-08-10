import Block from '../../tools/Block';
import SVGBlock from '../svg/svg';

interface ButtonProps {
  type?: string;
  className?: string;
  page?: string;
  text?: string;
  iconBefore?: SVGBlock;
  iconAfter?: SVGBlock;
  attr?: {
    [key: string]: string;
  };
  events?: {
    [key: string]: EventListenerOrEventListenerObject;
  };
}

class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      template: `
        <button 
          type="{{#if type}} {{ type }} {{else}} button {{/if}}" 
          class="{{#if className}} {{className}} {{else}} button {{/if}}" 
          {{#if page}} page="{{ page }}" {{/if}} 
        >
          {{{ iconBefore }}}
          
          {{#if text}}
            {{ text }}
          {{/if}}
          
          {{{ iconAfter }}}
        </button>
      `,
      children: {
        iconBefore: props.iconBefore,
        iconAfter: props.iconAfter,
      },
    });
  }
}

export default Button;
