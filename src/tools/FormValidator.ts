export default class FormValidate {
  isValidForm: boolean = true;

  formValidate = (e: SubmitEvent): boolean => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const { elements } = form;

    const formData: Record<string, string> = {};
    this.isValidForm = Array.from(elements).every((el) => {
      if (this.isFormInputElement(el)) {
        const input = el as HTMLInputElement;
        if (input.value) {
          formData[input.name] = input.value;
        }
        return this.validateInput(input);
      }
      // Пропускаем элементы формы, которые не являются формовыми элементами в валидацию
      return true;
    });

    if (this.isValidForm) {
      // eslint-disable-next-line no-console
      console.log('Form is valid:', formData);
    } else {
      // eslint-disable-next-line no-console
      console.log('Form is invalid');
    }
    return this.isValidForm;
  };

  isFormInputElement = (element: Element): element is HTMLInputElement => {
    return (
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement
    );
  };

  showInputErrors = (input: HTMLInputElement): void => {
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
    this.showInputErrors(input);
    return input.checkValidity();
  };
}
