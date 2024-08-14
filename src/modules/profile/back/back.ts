import Block from '../../../tools/Block';
import './style.scss';
import { ROUTES_PATH } from '../../../lib/constants/routes';
import { connect } from '../../../tools/connect';
import { Button, SVGBlock } from '../../../components';
import backIcon from '../../../assets/images/back__icon.svg?raw';

class BackBlock extends Block {
  constructor({ ...props }) {
    super({
      ...props,
      button: new Button({
        type: 'button',
        className: 'sidebar__button',
        iconBefore: new SVGBlock({
          template: backIcon,
        }),
        events: {
          click: () => this.handleClick(),
        },
      }),
      template: `
        <div class="sidebar__back-container">
          {{{ button }}}
        </div>
      `,
    });
  }

  public handleClick() {
    window.router.go(ROUTES_PATH.chat);
  }
}

export default connect(() => ({}))(BackBlock);
