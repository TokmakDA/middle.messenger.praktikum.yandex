import Block from '../../tools/Block';

class ButtonTransparent extends Block {
  constructor({ ...props }) {
    super({
      template: `
        <button type="{{ type }}" class='button-transparent'>
          {{ text }}
        </button>
      `,
      ...props,
    });
  }
}

export default ButtonTransparent;
