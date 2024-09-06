import { TFormData } from '../@types/types';

export default class FormValidate {
  isValidForm: boolean = true;
  formData: TFormData = {};

  // Метод для валидации формы
  formValidate = (e: SubmitEvent): boolean => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const { elements } = form;

    this.formData = {};
    this.isValidForm = Array.from(elements).every((el) => {
      if (this.isFormInputElement(el)) {
        const input = el as HTMLInputElement;
        if (input.value) {
          this.formData[input.name] = input.value;
        }
        return this.validateInput(input);
      }
      // Пропускаем элементы формы, которые не являются формовыми элементами в валидацию
      return true;
    });

    return this.isValidForm;
  };

  // Проверка, является ли элемент формовым элементом
  isFormInputElement = (
    element: Element,
  ): element is HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement => {
    return (
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement
    );
  };

  // Показать ошибки валидации для поля ввода
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

  // Проверка валидности поля ввода
  validateInput = (input: HTMLInputElement): boolean => {
    this.showInputErrors(input);
    return input.checkValidity();
  };

  // Получить данные полей формы
  giveFieldData = (): TFormData => {
    return this.formData;
  };
}
