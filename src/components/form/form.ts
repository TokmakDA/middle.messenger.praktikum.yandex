import Block from '../../tools/Block';
import FormValidate from '../../tools/FormValidator';
import { Input } from '../input';
import { Button } from '../button';
import { Link } from '../link';
import { TFormData } from '../../@types/types';

interface FormProps {
  onSubmit: (data: TFormData) => void; // Добавляем коллбэк для сабмита
  inputsList: { input: Input }[] | undefined;
  formName: string;
  button: Button;
  link: Link;
}

export default class Form extends Block {
  validator: FormValidate;

  onSubmit: (data: Record<string, string>) => void;

  constructor({ onSubmit, ...props }: FormProps) {
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
        submit: (e: SubmitEvent): void => this.handleSubmit(e),
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
}
