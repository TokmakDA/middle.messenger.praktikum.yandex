import tpl from './tpl.hbs?raw';
import './style.scss';
import Block from '../../../tools/Block';

// Handlebars.registerPartial('chatCard', chatCard);
// Handlebars.registerPartial('sidebar', sidebar);

class ChatsPanelBlock extends Block {
  constructor({ ...props }) {
    super({ tpl, ...props });
  }
}

export default ChatsPanelBlock;
