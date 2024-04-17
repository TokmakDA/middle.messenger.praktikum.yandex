import Block from '../../tools/Block';
import template from './tpl.hbs?raw';
import './style.scss';

class AuthorizeBlock extends Block {
  constructor({ ...props }) {
    super({ template, ...props });
  }
}
export default AuthorizeBlock;
