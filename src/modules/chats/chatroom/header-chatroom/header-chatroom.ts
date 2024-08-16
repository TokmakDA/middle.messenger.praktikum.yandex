import Block from '../../../../tools/Block';
import './style.scss';
import { connect } from '../../../../tools/connect';
import DialogButton from '../../../../components/dialogButton/dialogButton';
import {
  menuSVG,
  removeSVG,
  addSVG,
  addPhotoSVG,
  deleteForeverSVG,
} from '../../../../assets/images';
import { Button, SVGBlock } from '../../../../components';
import URLS from '../../../../lib/constants/urls';
import { BlockProps } from '../../../../@types/block';
import { AppState } from '../../../../@types/store';
import avatarSVG from '../../../../assets/images/avatar.svg';

interface HeaderChatroomProps extends BlockProps {
  currentChat: AppState['currentChat'];
  handleSetChatAvatar: (e: Event) => void;
  handleRemoveChat: (e: Event) => void;
  handleAddUser: (e: Event) => void;
  handleRemoveUser: (e: Event) => void;
}

class HeaderChatroomBlock extends Block {
  constructor({ ...props }: HeaderChatroomProps) {
    super({
      ...props,
      avatarSVG,
      button: new DialogButton({
        isIcon: true,
        dialogPosition: 'bottom-left',
        iconAfter: new SVGBlock({ template: menuSVG }),
        dialogContent: [
          {
            addAvatar: new Button({
              small: true,
              iconBefore: new SVGBlock({
                template: addPhotoSVG,
                attr: {
                  width: '16px',
                },
              }),
              text: 'Установить аватар',
              events: {
                click: (e: Event) => props.handleSetChatAvatar(e),
              },
            }),
          },
          {
            removeChat: new Button({
              small: true,
              iconBefore: new SVGBlock({
                template: deleteForeverSVG,
                attr: {
                  width: '16px',
                },
              }),
              text: 'Удалить Чат',
              events: {
                click: (e: Event) => props.handleRemoveChat(e),
              },
            }),
          },
          {
            addUser: new Button({
              small: true,
              iconBefore: new SVGBlock({
                template: addSVG,
                attr: {
                  width: '16px',
                },
              }),
              text: 'Добавить пользователя',
              events: {
                click: (e: Event) => props.handleAddUser(e),
              },
            }),
          },
          {
            removeUser: new Button({
              small: true,
              iconBefore: new SVGBlock({
                template: removeSVG,
                attr: {
                  width: '16px',
                },
              }),
              text: 'Удалить пользователя',
              events: {
                click: (e: Event) => props.handleRemoveUser(e),
              },
            }),
          },
        ],
      }),
    });
  }

  render() {
    const { base, resources } = URLS;
    const url = `${base}${resources}${(this.props as HeaderChatroomProps).currentChat?.avatar}`;

    return `
        <div class='chat__header'>
          <div class='chat__name'>
            <div class='chat__avatar-wrapper'>
              <img class="chat__avatar" src="{{#if currentChat.avatar}} ${url} {{ else }} ${avatarSVG} {{/if}}" alt="аватар" />
            </div>
            <h1 class='chat__title'>{{ currentChat.title }}</h1>
          </div>
          <div class='chat__menu'>
            {{{ button }}}
          </div>
        </div>
      `;
  }
}

// export default HeaderChatroomBlock;
export default connect(({ currentChat }) => ({ currentChat }))(
  HeaderChatroomBlock,
);
