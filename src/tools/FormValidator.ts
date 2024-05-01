export default class FormValidate {
  isValidForm: boolean = true;

  formValidate = (e: SubmitEvent): void => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const { elements } = form;

    const formData: Record<string, string> = {};
    this.isValidForm = Array.from(elements).reduce((isValid, el) => {
      if (el instanceof HTMLInputElement) {
        if (el.value) formData[el.getAttribute('name') as string] = el.value;
        return this.validateInput(el);
      }
      return isValid;
    }, true);

    if (this.isValidForm) {
      // eslint-disable-next-line no-console
      console.log('Form is valid:', formData);
    } else {
      // eslint-disable-next-line no-console
      console.log('Form is invalid');
    }
  };

  _showInputErrors = (input: HTMLInputElement): void => {
    const parent = input.closest('.input');

    if (parent) {
      if (!input.checkValidity()) {
        parent.setAttribute('data-error', 'true');
        const errorElement = parent.querySelector(
          '.input__error',
        ) as HTMLElement;
        errorElement.textContent = input.validationMessage;
      } else {
        parent.removeAttribute('data-error');
      }
    }
  };

  validateInput = (input: HTMLInputElement): boolean => {
    this._showInputErrors(input);
    return input.checkValidity();
  };
}
