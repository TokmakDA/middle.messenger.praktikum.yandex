import FormValidate from '../../../tools/FormValidator';

export default class CustomFormValidate extends FormValidate {
  // Переопределите метод showInputErrors
  showInputErrors = (input: HTMLInputElement): void => {
    const parent = input.closest('.input-container');

    if (parent) {
      if (!input.checkValidity()) {
        parent.setAttribute('data-error', 'true');
        const errorElement = parent.querySelector(
          '.input-container__error',
        ) as HTMLElement;
        errorElement.textContent = input.validationMessage;
      } else {
        parent.removeAttribute('data-error');
      }
    }
  };
}
