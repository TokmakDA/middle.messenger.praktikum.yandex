import './style.scss';
import Block from '../../../../../tools/Block';
import template from './tpl.hbs?raw';

class FormMessage extends Block {
  constructor({ ...props }) {
    super({
      ...props,
      template,
      events: {
        submit: (e: SubmitEvent): void => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const formData: Record<string, string> = {};
          const messageElement = form.querySelector(
            "[name = 'message']",
          ) as HTMLTextAreaElement;

          if (messageElement) {
            if (messageElement.checkValidity()) {
              formData.message = messageElement.value;
              // eslint-disable-next-line no-console
              console.log(formData);
              form.reset();
            }
          }
          // eslint-disable-next-line no-console
          console.log('Form is invalid');
        },
      },
    });
  }
}

export default FormMessage;
