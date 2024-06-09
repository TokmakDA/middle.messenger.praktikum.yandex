import { LoyautCenter } from '../../layouts';
import { ErrorBlock } from '../../modules/error';
import Block from '../../tools/Block';

class ErrorPage404 extends LoyautCenter {
  constructor() {
    super({
      content: new ErrorBlock({ title: '404', text: 'Не туда попали' }),
    });
  }
}

export default ErrorPage404 as typeof Block;
