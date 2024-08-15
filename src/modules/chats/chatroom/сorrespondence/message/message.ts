import Block from '../../../../../tools/Block';
import CheckmarkBlock from '../../../../../components/checkmark';
import './style.scss';
import getFormattedDate from '../../../../../lib/utils/getFormattedDate';
import { WebSocketResponseMessage } from '../../../../../@types/socket';
import { AppState } from '../../../../../@types/store';
import URLS from '../../../../../lib/constants/urls';

class MessageBlock extends Block {
  constructor({ ...props }) {
    super({
      checkmark: new CheckmarkBlock({ is_read: props.is_read }),
      ...props,
    });
  }

  render(): string {
    /* eslint-disable-next-line @typescript-eslint/naming-convention */
    const { time, user_id, user, type, file } = this
      .props as WebSocketResponseMessage & AppState;
    const displayTime = getFormattedDate(time);
    const isMy = `${user_id}` === `${user?.id}`;

    const { base, resources } = URLS;
    const url = `${base}${resources}${file}`;
    const image = type.includes('image');

    return `
        <div class='chat__message {{#if ${isMy}}} chat__is-my {{/if}}'>
          <div class='chat__wrapper'>
            {{# if ${image} }}
              <img class="chat__image" src="${url}" alt="Картинка"/>
            {{/if}}
            <p class='chat__text'>{{ content }}</p>
            <div class='chat__time-stamp'>
              <time class='chat__time' datetime='${displayTime}'>${displayTime}</time>
              {{#if is_read}}
                {{{checkmark}}}
              {{/if}}
            </div>
          </div>
        </div>
      `;
  }
}

export default MessageBlock;
