import Block from '../../../../tools/Block';
import './style.scss';
import { MessageBlock } from './message';

class DialogBlock extends Block {
  constructor({ ...props }) {
    super({
      template: `
        <div class="chat__correspondence">
          {{{message}}}
        </div>
      `,
      message: new MessageBlock({}),
      ...props,
    });
  }
}

export default DialogBlock;
