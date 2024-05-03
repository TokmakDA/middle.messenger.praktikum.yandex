import Block from '../../../../tools/Block';
import './style.scss';
import { FormMessage } from './formMessage';

class FooterChatroomBlock extends Block {
  constructor({ ...props }) {
    super({
      template: `
        <div class="chat__footer">
          {{{ formMessage }}}
        </div>
      `,
      ...props,
      formMessage: new FormMessage({ ...props }),
    });
  }
}

export default FooterChatroomBlock;
