import './style.scss';
import { ChatsPanelButton } from './button';
import Block from '../../../tools/Block';

class ChatsPanelBlock extends Block {
  constructor({ ...props }) {
    super({
      ...props,

      template: `
        <section class='sidebar'>
          <div class='sidebar__header'>
            {{{ profileButton }}}
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
      profileButton: new ChatsPanelButton(),
    });

    console.log(this.props)
  }
}

export default ChatsPanelBlock;
