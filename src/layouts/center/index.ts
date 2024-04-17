import Block from '../../tools/Block';
import template from './tpl.hbs?raw';
import './style.scss';

class LoyautCenterBlock extends Block {
  constructor({ ...props }) {
    super({ template, ...props });
    // setTimeout(() => {
    //   this.children.content.setProps({ title: 'Проход' });
    // }, 2000);
  }
}

export default LoyautCenterBlock;
