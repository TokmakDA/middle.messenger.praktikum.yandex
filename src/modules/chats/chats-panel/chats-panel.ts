import './style.scss';
import Block from '../../../tools/Block';
import arrowSVG from '../../../assets/images/arrow-right.svg';

class ChatsPanelBlock extends Block {
  constructor({ ...props }) {
    super({
      template: `
        <section class='sidebar'>
          <div class='sidebar__header'>
            <a href='/profile' class='sidebar__link_profile'><span
                class='sidebar__link-text'
              >Профиль</span>
              <img src="${arrowSVG}" alt="Arrow" class="sidebar__link-icon">
            </a>
            <form class='sidebar__search'>
              <input
                type='search'
                class='sidebar__search-input'
                placeholder='Поиск'
                name='chat-search'
                id='chat-search'
                value=''
              />
            </form>
          </div>
          <div class='sidebar__chats chats'>
            <div class='sidebar__line'></div>
            <ul class='chats__list'>
              {{{ chats }}}
            </ul>
          </div>
        </section>
      `,
      ...props,
      arrowSVG,
    });
  }
}

export default ChatsPanelBlock;
