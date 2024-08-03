import Block from '../../tools/Block';
import './style.scss';
import { Link } from '../../components';
import { ROUTES_PATH } from '../../lib/constants/routes.ts';

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
      link: new Link({ text: 'Назад к чатам', url: ROUTES_PATH.chat }),
      ...props,
    });
  }
}

export default ErrorBlock;
