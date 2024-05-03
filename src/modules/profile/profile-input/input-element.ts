import Block from '../../../tools/Block';
import CustomFormValidate from '../profile-form/validator';
import './style.scss';

class InputElement extends Block {
  validator: CustomFormValidate;

  constructor({ ...props }) {
    super({
      template: `
        <input
          class="input-container__input"
          id="{{ name }}"
          placeholder="{{ label }}"
          value="{{ value }}"
          name="{{ name }}"
        />
      `,
      ...props,
      events: {
        blur: (e: Event): void => {
          this.validator.validateInput(e.currentTarget as HTMLInputElement);
        },
      },
    });

    this.validator = new CustomFormValidate();
  }
}

export default InputElement;
