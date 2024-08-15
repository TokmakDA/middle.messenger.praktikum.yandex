import './style.scss';
import Block from '../../../../../tools/Block';
import template from './tpl.hbs?raw';
import { WebSocketService } from '../../../../../api/WebSocket';
import { Button, SVGBlock } from '../../../../../components';
import { imageSVG } from '../../../../../assets/images';

class FormMessage extends Block {
  constructor({ ...props }) {
    super({
      ...props,
      template,
      mediaButton: new Button({
        iconAfter: new SVGBlock({ template: imageSVG }),
        isIcon: true,
        events: {
          click: (e: Event) => props.handleSendChatMedia(e),
        },
      }),
      events: {
        submit: (e: SubmitEvent): void => {
          e.preventDefault();
          this.handleSubmit(e);
        },
        input: (e: Event): void => {
          this.handleInput(e);
        },
      },
    });
  }

  private handleSubmit(e: SubmitEvent) {
    const form = e.currentTarget as HTMLFormElement;
    const formData: Record<string, string> = {};
    const messageElement = form.querySelector(
      "[name='message']",
    ) as HTMLTextAreaElement;

    if (messageElement && messageElement.checkValidity()) {
      formData.message = messageElement.value;

      WebSocketService.getInstance().sendMessage(formData.message);
      form.reset();
      this.updateSubmitButtonState(form);
    }
  }

  private handleInput(e: Event) {
    const form = e.currentTarget as HTMLFormElement;
    this.updateSubmitButtonState(form);
  }

  private updateSubmitButtonState(form: HTMLFormElement) {
    const messageElement = form.querySelector(
      "[name='message']",
    ) as HTMLTextAreaElement;
    const submitButton = form.querySelector(
      '#submit-button',
    ) as HTMLButtonElement;

    if (messageElement && submitButton) {
      submitButton.disabled = !messageElement.checkValidity();
    }
  }
}

export default FormMessage;
