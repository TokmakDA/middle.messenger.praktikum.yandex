import Block from '../../tools/Block';
import { ButtonProps } from '../../@types/types';
import './style.scss';

class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,

      template: `
        <button 
          type="{{#if type}} {{ type }} {{else}} button {{/if}}" 
          class="{{#if className}} {{className}} {{else}} button {{/if}} {{#if isActive}} active {{/if}} 
          {{#if flat }} flat {{else if outline }} outline {{else}} {{/if}} {{#if isIcon}} icon {{/if}}
          {{#if small}} small {{/if}}" 
          {{#if page}} page="{{ page }}" {{/if}} 
          {{#if disabled}} disabled {{/if}}
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
