import Block from '../../tools/Block';

export default class AuthorizeWrapper extends Block {
  constructor({ ...props }) {
    super({
      ...props,
      template: `
        <div class="modal">
          <h1 class="modal__title">{{ title }}</h1>
          {{{ form }}}
        </div>
      `,
    });
  }
}
