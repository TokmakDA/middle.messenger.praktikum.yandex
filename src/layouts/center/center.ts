import Block from '../../tools/Block';

export default class Center extends Block {
  constructor({ ...props }) {
    super({
      ...props,
      template: `
        <div class="center">
          {{{ content }}}
        </div>
      `,
    });
  }
}
