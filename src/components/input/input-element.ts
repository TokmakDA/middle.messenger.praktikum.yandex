import Block from '../../tools/Block';

class InputElement extends Block {
  constructor({ ...props }) {
    super({
      ...props,
      template: `
        <input
          type={{ type }}
          class="input__element"
          id={{ name }}
          placeholder=""
          value={{ value }}
          name={{ name }}
          required={{ required }}
        />
      `,
      events: {
        blur: props.onBlur,
        click: props.onClick,
      },
    });
  }
}

export default InputElement;
