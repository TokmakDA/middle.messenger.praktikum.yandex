import Block from '../../tools/Block';

class InputElement extends Block {
  constructor({ ...props }) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
        click: props.onClick,
      },
    });
  }

  render() {
    return `
        <input
          type="{{type}}"
          class="input__element"
          id="{{name}}"
          placeholder=""
          value="{{value}}"
          name="{{name}}"
          required="{{required}}"
        />
      `;
  }
}

export default InputElement;
