import Block from '../../../../tools/Block';
import './style.scss';
import avatarSVG from '../../../../assets/images/avatar.svg';

class HeaderChatroomBlock extends Block {
  constructor({ ...props }) {
    super({
      template: `
        <div class='chat__header'>
          <div class='chat__name'>
            {{! Блок с аватаркой и значом сети }}
            <div class='chat__avatar-wrapper chat__avatar-wrapper_is-online'>
              {{#if avatar}}
                <img class='chat__avatar' src='{{avatarSVG}}' alt='аватар' />
              {{else}}
                <span class="chat__initials">{{initials}}</span>
              {{/if}}
            </div>
            <h1 class='chat__title'>Вадим</h1>
          </div>
          <div class='chat__menu'>
            <button class='chat__button'>
              <svg
                width='5'
                height='20'
                viewBox='0 0 5 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='2.5' cy='2.5' r='2.5' fill='#999999' />
                <circle cx='2.5' cy='10' r='2.5' fill='#999999' />
                <circle cx='2.5' cy='17.5' r='2.5' fill='#999999' />
              </svg>

            </button>
          </div>
        </div>
      `,
      avatarSVG,
      ...props,
    });
  }
}

export default HeaderChatroomBlock;
