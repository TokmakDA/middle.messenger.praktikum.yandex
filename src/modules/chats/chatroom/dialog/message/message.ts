import Block from '../../../../../tools/Block';
import CheckmarkBlock from '../../../../../components/checkmark';
import './style.scss';

const text = `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`;

class MessageBlock extends Block {
  constructor({ ...props }) {
    super({
      template: `
        <div class='chat__message aling_start'>
          <div class='chat__wrapper'>
            <p class='chat__text'>{{text}}</p>
            <div class='chat__time-stamp'>
              <time class='chat__time' datetime='11:56'>11:56</time>{{{checkmark}}}
            </div>
          </div>
        </div>
      `,
      text,
      checkmark: new CheckmarkBlock({ is_read: true }),
      ...props,
    });
  }
}

export default MessageBlock;
