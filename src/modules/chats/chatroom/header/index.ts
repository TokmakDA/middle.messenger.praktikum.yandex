import Block from '../../../../tools/Block';
import tpl from './tpl.hbs?raw';
import './style.scss';
import avatarSVG from '../../../../assets/images/avatar.svg';

class HeaderChatsBlock extends Block {
  constructor({ ...props }) {
    super({
      tpl,
      avatarSVG,
      ...props,
    });
  }
}

export default HeaderChatsBlock;
