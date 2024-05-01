import Block from '../../tools/Block';

export default class Rows extends Block {
  constructor({ ...props }) {
    super({
      ...props,
      template: `
        <div class="rows">
          {{{ rows }}}
        </div>
      `,
    });
  }
}
