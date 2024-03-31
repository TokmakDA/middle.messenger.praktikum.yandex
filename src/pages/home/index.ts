// eslint-disable-next-line max-classes-per-file
import tpl from './tpl.hbs?raw';
import './style.scss';
import { CenterBlock } from '../../layouts/center';
import ROUTES from '../../data/constants';
import Block from '../../tools/Block';

class HomeBlock extends Block {
  constructor({ ...props }) {
    super({ ...props });
  }

  // eslint-disable-next-line class-methods-use-this
  render(): string {
    return tpl;
  }
}

const centerBlock = new CenterBlock({
  content: new HomeBlock({
    links: ROUTES,
  }),
});

export default centerBlock.getContent();
