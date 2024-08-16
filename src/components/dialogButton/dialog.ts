import Block from '../../tools/Block';
import { DialogProps } from '../../@types/types';

class Dialog extends Block {
  constructor(props: DialogProps) {
    super({
      ...props,
      template: `
        <div class="dialog {{ position }} {{#if isOpen}} open {{/if}}">
          {{{ content }}}
        </div>
      `,
    });
  }
}

export default Dialog;
