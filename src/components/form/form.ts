import Block from '../../tools/Block';
import FormValidate from '../../tools/FormValidator';
import { TFormData } from '../../@types/types';
import { Children } from '../../@types/block';
import { AppState } from '../../@types/store';

interface FormProps {
  onSubmit: (data: TFormData) => void; // Добавляем коллбэк для сабмита
  fields?: Children[] | Block;
  formName?: string;
  actions?: Children[] | Block;
  handleInputChange?: (e?: Event) => void;
  errorMessage?: AppState['error'];
}

export default class Form extends Block {
  validator: FormValidate;

  onSubmit: (data: Record<string, string>) => void;

  constructor({ onSubmit, ...props }: FormProps) {
    super({
      ...props,
      // TODO Добавить вывод ошибки
      template: `
        <form class="form" name={{ formName }}  novalidate>
          <div class="form__inputs">
            {{{ fields }}}
          </div>
          <div class="form__inputs">
            {{{ actions }}}
          </div>
        </form>
      `,
      events: {
        submit: (e: SubmitEvent): void => this.handleSubmit(e),
        input: (e: Event): void => this.handleInputChange(e),
      },
    });

    this.validator = new FormValidate();
    this.onSubmit = onSubmit; // Сохраняем коллбэк для сабмита
  }

  handleSubmit(e: SubmitEvent): void {
    e.preventDefault();
    if (this.validator.formValidate(e)) {
      const formData = this.validator.giveFieldData();
      this.onSubmit(formData); // Вызываем переданный коллбэк с данными формы
    }
  }

  handleInputChange(e: Event): void {
    console.log(e);
    const { handleInputChange } = this.props as FormProps;
    if (handleInputChange) {
      this.handleInputChange(e);
    }
  }
}
