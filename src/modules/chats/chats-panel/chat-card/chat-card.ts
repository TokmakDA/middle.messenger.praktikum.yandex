import template from './tpl.hbs?raw';
import './style.scss';
import Block from '../../../../tools/Block';

class ChatCardBlock extends Block {
  constructor({ ...props }) {
    super({
      ...props,
      template: `
        <li>
          <div class="chats__chat-card chat-card" active="{{is_active}}">
            {{! Блок с аватаркой и значом сети }}
            <div class="chat-card__avatar-wrapper chat-card__avatar-wrapper_is-online">
              {{#if avatar}}
              <img class="chat-card__avatar" src="{{avatarSVG}}" alt="аватар" />
              {{else}}
              <span class="chat-card__initials">{{initials}}</span>
              {{/if}}
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
      `,
    });

    console.log('ChatCardBlock =>', this.props);
  }
}

export default ChatCardBlock;
