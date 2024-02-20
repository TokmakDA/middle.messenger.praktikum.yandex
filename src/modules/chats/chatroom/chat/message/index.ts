import Handlebars from 'handlebars';
import tpl from './tpl.hbs?raw';
import './style.scss';
import checkmark from '../../../../../components/checkmark';

Handlebars.registerPartial('checkmark', checkmark);

const text = `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`;

export default (props: {}) => {
  console.log(props);
  return Handlebars.compile(tpl)({
    ...props,
    text,
  });
};
