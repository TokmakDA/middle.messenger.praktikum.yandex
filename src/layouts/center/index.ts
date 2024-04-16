import Block from '../../tools/Block';
import tpl from './tpl.hbs?raw';
import './style.scss';

class LoyautCenterBlock extends Block {
  constructor({ ...props }) {
    super({ tpl, ...props });
    // setTimeout(() => {
    //   this.children.content.setProps({ title: 'Проход' });
    // }, 2000);
  }
}

export default LoyautCenterBlock;
