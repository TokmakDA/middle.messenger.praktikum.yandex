import Block from '../../tools/Block';
import './style.scss';
import { Link } from '../../components';

class ErrorBlock extends Block {
  constructor({ ...props }) {
    super({
      template: `
        <div class='page__error error'>
          <div class='error__wrapper'>
            <h1 class='error__title'>
              {{title}}
            </h1>
            <p class='error__text'>{{text}}</p>
          </div>
          {{{link}}}
        </div>
      `,
      link: new Link({ text: 'Назад к чатам', url: '/chats' }),
      ...props,
    });
  }
}

export default ErrorBlock;
