import Block from '../../tools/Block';
import template from './tpl.hbs?raw';
import './style.scss';
import LinkBlock from '../../components/link';

class ErrorBlock extends Block {
  constructor({ ...props }) {
    super({
      template,
      link: new LinkBlock({ text: 'Назад к чатам', url: '/chats' }),
      ...props,
    });
  }
}

export default ErrorBlock;
