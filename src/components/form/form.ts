import Block from '../../tools/Block';
import FormValidate from '../../tools/FormValidator';

export default class Form extends Block {
  formValidator: FormValidate;

  constructor({ ...props }) {
    super({
      ...props,
      template: `
        <form class="form" name={{ formName }}  novalidate>
          <div class="form__inputs">
            {{{ inputsList }}}
          </div>
          <div class="form__inputs">
            {{{ button }}}
            {{{ link }}}
          </div>
        </form>
      `,
      events: {
        submit: (e: SubmitEvent): void => {
          this.formValidator.formValidate(e);
        },
      },
    });

    this.formValidator = new FormValidate();
  }
}
