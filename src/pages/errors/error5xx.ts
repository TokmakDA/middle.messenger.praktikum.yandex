import { LoyautCenter } from '../../layouts';
import { ErrorBlock } from '../../modules/error';
import Block from '../../tools/Block';

class ErrorPage5XX extends LoyautCenter {
  constructor(props: { content: Block }) {
    super({
      ...props,
      content: new ErrorBlock({ title: '500', text: 'Мы уже фиксим' }),
    });
  }
}

export default ErrorPage5XX as typeof Block;
