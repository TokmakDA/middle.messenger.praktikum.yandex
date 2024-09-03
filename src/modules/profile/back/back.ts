import Block from '../../../tools/Block';
import './style.scss';
import { connect } from '../../../tools/connect';
import { Button, SVGBlock } from '../../../components';
import backIcon from '../../../assets/images/back__icon.svg?raw';
import RouteManager from '../../../routes/RouteManager';

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
    RouteManager.goRoute('chat');
  }
}

export default connect(() => ({}))(BackBlock);
