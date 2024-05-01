import Block from '../../tools/Block';
import FormValidate from '../../tools/FormValidator';

export default class InputElement extends Block {
  formValidator: FormValidate;

  constructor({ ...props }) {
    super({
      ...props,
      template: `
        <input
          class="input__element"
          placeholder=""
          name='{{ name }}'
          id='{{ name }}'
          value='{{ value }}'
        />
      `,
      events: {
        blur: (e: Event): void => {
          this.formValidator.validateInput(e.currentTarget as HTMLInputElement);
        },
      },
    });
    this.formValidator = new FormValidate();
  }
}
