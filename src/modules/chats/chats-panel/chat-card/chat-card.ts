import './style.scss';
import Block from '../../../../tools/Block';
import { connect } from '../../../../tools/connect';
import { ChatsController } from '../../../../controllers';
import { TChatCard } from '../../../../@types/api';
import { AppState } from '../../../../@types/store';
import avatarSVG from '../../../../assets/images/avatar.svg';
import URLS from '../../../../lib/constants/urls';

type IChatCardProps = TChatCard & AppState;

class ChatCardBlock extends Block {
  constructor(props: IChatCardProps) {
    super({
      ...props,
      avatarSVG,
      events: {
        click: () => this.handleChatClick(props),
      },
    });
  }

  async handleChatClick({
    id,
    title,
    avatar,
    unread_count,
    created_by,
    last_message,
  }: IChatCardProps) {
    const chat = { id, title, avatar, unread_count, created_by, last_message };
    await ChatsController.selectChat(chat);
  }

  render(): string {
    const { id, currentChat, avatar } = this.props as IChatCardProps;
    const isActive = id === currentChat?.id;
    const { base, resources } = URLS;
    const url = `${base}${resources}${avatar}`;

    return `
      <li>
        <div class="chats__chat-card chat-card {{#if ${isActive}}} chat-card_active {{/if}} "">
          {{! Блок с аватаркой и значом сети }}
          <div class="chat-card__avatar-wrapper {{!chat-card__avatar-wrapper_is-online}}">
            <img 
              class="chat-card__avatar" 
              src="{{#if avatar}} ${url} {{ else }} ${avatarSVG} {{/if}}" 
              alt="аватар" 
            />
          </div>
          <div class="chat-card__info-blok">
            {{! Блок с названием чата и датой последнего сообщения }}
            <div class="chat-card__info_wrapper chat-card__info_wrapper_top">
              {{! Название чата }}
              <span class="chat-card__full-username"> {{title}} </span>
              {{! Блок с отчетом о получении и датой последнего сообщения }}
              <div class="chat-card__report">
                {{! Блок с отчетом о получении }} {{! временная конструкция}} {{#if
                isMy}} {{{checkmark}}} {{/if}} {{! дата последнего сообщения }}
                <time class="chat-card__time" datetime="{{last_message.time}}"
                  >{{displayTime}}</time
                >
              </div>
            </div>
            <div class="chat-card__info_wrapper chat-card__info_wrapper_bottom">
              <p class="chat-card__message">
                {{#if isMy}}
                <span>Вы: </span>
                {{/if}} {{last_message.content}}
              </p>
              {{#if unread_count}}
              <span class="chat-card__unread-count"> {{unread_count}} </span>
              {{/if}}
            </div>
          </div>
        </div>
        <div class="sidebar__line"></div>
      </li>
    `;
  }
}

export default connect((store) => ({
  currentChat: store.currentChat,
}))(ChatCardBlock);
