import FormValidate from '../../../tools/FormValidator';

export default class CustomFormValidate extends FormValidate {
  // Переопределение метода showInputErrors
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
        const errorElement = parent.querySelector(
          '.input-container__error',
        ) as HTMLElement;
        errorElement.textContent = ''; // Очищаем текст ошибки
      }
    }
  };

  // Метод для проверки совпадения паролей
  validatePasswordMatch(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }

  // Переопределение метода formValidate для проверки паролей
  formValidate = (e: SubmitEvent): boolean => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const { elements } = form;

    this.formData = {};
    this.isValidForm = Array.from(elements).every((el) => {
      if (this.isFormInputElement(el)) {
        const input = el as HTMLInputElement;
        if (input.value) {
          // Использование точечной нотации
          this.formData[input.name] = input.value;
        }
        return this.validateInput(input);
      }
      // Пропускаем элементы формы, которые не являются формовыми элементами в валидацию
      return true;
    });

    // Деструктуризация объекта formData
    const { newPassword, rePassword } = this.formData;
    const rePasswordInput = form.querySelector(
      '[name="rePassword"]',
    ) as HTMLInputElement;

    if (newPassword && rePassword) {
      if (!this.validatePasswordMatch(newPassword, rePassword)) {
        this.isValidForm = false;
        rePasswordInput.setCustomValidity('Пароли не совпадают');
        this.showInputErrors(rePasswordInput);
      } else {
        rePasswordInput.setCustomValidity(''); // Сброс пользовательской ошибки
        this.showInputErrors(rePasswordInput); // Убираем ошибку отображения
      }
    }

    return this.isValidForm;
  };
}
