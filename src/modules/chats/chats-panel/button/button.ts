import './style.scss';
import arrowSVG from '../../../../assets/images/arrow-right.svg';
import Block from '../../../../tools/Block';
import RouteManager from '../../../../routes/RouteManager';

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
          RouteManager.goRoute('profile');
        },
      },
    });
  }
}

export default ChatsPanelButton;
