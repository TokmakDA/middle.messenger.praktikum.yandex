import Block from '../../tools/Block';

export default class Sidebar extends Block {
  constructor({ ...props }) {
    super({
      ...props,
      template: `
        <section class="sidebar {{ className }}">
          {{{ content }}}
        </section>
       `,
    });
  }
}
