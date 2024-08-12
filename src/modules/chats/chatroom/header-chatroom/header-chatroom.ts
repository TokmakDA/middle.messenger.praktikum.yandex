import Block from '../../../../tools/Block';
import './style.scss';
import { connect } from '../../../../tools/connect';
import DialogButton from '../../../../components/dialogButton/dialogButton';
import { menuSVG, removeSVG, addSVG } from '../../../../assets/images';
import { Button, SVGBlock } from '../../../../components';

class HeaderChatroomBlock extends Block {
  constructor({ ...props }) {
    super({
      ...props,
      button: new DialogButton({
        isIcon: true,
        dialogPosition: 'bottom-left',
        iconAfter: new SVGBlock({ template: menuSVG }),

        dialogContent: [
          {
            add: new Button({
              iconBefore: new SVGBlock({ template: addSVG }),
              text: 'Добавить пользователя',
              events: {
                click: (e: Event) => props.handleAddUser(e),
              },
            }),
          },
          {
            remove: new Button({
              iconBefore: new SVGBlock({ template: removeSVG }),
              text: 'Удалить пользователя',
              events: {
                click: (e: Event) => props.handleRemoveUser(e),
              },
            }),
          },
        ],
      }),
      template: `
        <div class='chat__header'>
          <div class='chat__name'>
            <div class='chat__avatar-wrapper'>
              {{#if currentChat.avatar}}
                <img class='chat__avatar' src='{{ currentChat.avatar }}' alt='аватар' />
              {{else}}
                <span class="chat__initials">{{ initials }}</span>
              {{/if}}
            </div>
            <h1 class='chat__title'>{{ currentChat.title }}</h1>
          </div>
          <div class='chat__menu'>
            {{{ button }}}
          </div>
        </div>
      `,
    });
  }
}

// export default HeaderChatroomBlock;
export default connect(({ currentChat }) => ({ currentChat }))(
  HeaderChatroomBlock,
);
