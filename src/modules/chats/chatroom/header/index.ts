import Block from '../../../../tools/Block';
import template from './tpl.hbs?raw';
import './style.scss';
import avatarSVG from '../../../../assets/images/avatar.svg';

class HeaderChatsBlock extends Block {
  constructor({ ...props }) {
    super({
      template,
      avatarSVG,
      ...props,
    });
  }
}

export default HeaderChatsBlock;
