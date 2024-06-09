import Block from '../../tools/Block';

export default class AuthorizeWrapper extends Block {
  constructor({ ...props }) {
    super({
      ...props,
      template: `
        <div class="modal">
          <h1 class="modal__title">{{ title }}</h1>
          {{#if isLoading}}
            <p>Загрузка</p>
          {{else}}
            {{{ form }}}
            {{#if loginError }}
              <p>{{{ loginError }}}</p>
            {{/if}}
          {{/if}}
        </div>
      `,
    });
  }
}
