import Handlebars from 'handlebars';
import Block from '../../tools/Block';
import './style.scss';
import tpl from './tpl.hbs?raw';

const center = (props = {}) => Handlebars.compile(tpl)(props);
class CenterBlock extends Block {
  constructor({ ...props }) {
    super({ ...props });
  }

  // eslint-disable-next-line class-methods-use-this
  render(): string {
    return tpl;
  }
}

export { CenterBlock, center };
