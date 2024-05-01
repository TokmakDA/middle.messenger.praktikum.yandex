import Block from '../../tools/Block';

class Button extends Block {
  constructor({ ...props }) {
    super({
      template: `
        <button type={{ type }} class="button">
          {{ text }}
        </button>
      `,
      ...props,
    });
  }
}

export default Button;
