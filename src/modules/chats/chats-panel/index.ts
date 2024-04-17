import template from './tpl.hbs?raw';
import './style.scss';
import Block from '../../../tools/Block';

// Handlebars.registerPartial('chatCard', chatCard);
// Handlebars.registerPartial('sidebar', sidebar);

class ChatsPanelBlock extends Block {
  constructor({ ...props }) {
    super({ template, ...props });
  }
}

export default ChatsPanelBlock;
