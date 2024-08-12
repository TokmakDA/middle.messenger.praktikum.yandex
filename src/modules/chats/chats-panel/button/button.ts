import './style.scss';
import arrowSVG from '../../../../assets/images/arrow-right.svg';
import { ROUTES_PATH } from '../../../../lib/constants/routes';
import Block from '../../../../tools/Block';

class ChatsPanelButton extends Block {
  constructor() {
    super({
      template: `
        <button type="button" class='sidebar__link_profile'>
          <span class='sidebar__link-text'>Профиль</span>
          <img src="${arrowSVG}" alt="Arrow" class="sidebar__link-icon">
        </button>
      `,
      events: {
        click: () => {
          window.router.go(ROUTES_PATH.profile);
        },
      },
    });
  }
}

export default ChatsPanelButton;
