import Block from '../../tools/Block';
import Dialog from './dialog';
import './style.scss';
import { Button } from '../button';
import { ButtonProps, DialogProps } from '../../@types/types';

type DialogButtonProps = DialogProps &
  ButtonProps & {
    classNameButton?: ButtonProps['className'];
    className?: string;
  };

class DialogButton extends Block {
  private isOpen: boolean;

  constructor(props: DialogButtonProps & ButtonProps) {
    super({
      dialog: new Dialog({
        ...props,
        position: props.dialogPosition || 'bottom',
        events: {
          click: (e: Event) => {
            e.stopPropagation();
          },
        },
        content: props?.dialogContent || 'Окно диалоговое',
      }),
      button: new Button({
        ...props,
        className: props.classNameButton,
        events: {
          click: () => this.handleButtonClick(),
        },
      }),
      events: {
        click: () => this.closeDialog(),
      },
    });

    this.isOpen = props.isOpen || false;
  }

  render() {
    const { isOpen } = this;
    return `
      <div class="dialog-button__container {{#if ${isOpen} }} open {{/if}} {{#if className}} {{className}} {{/if}}">
        {{{ button }}}
        {{{ dialog }}}
      </div>
    `;
  }

  handleButtonClick() {
    this.isOpen = !this.isOpen;
    this.updateDialogState();
  }

  closeDialog() {
    this.isOpen = false;
    this.updateDialogState();
  }

  updateDialogState() {
    const { dialog, button } = this.children;
    dialog.setPropsAndChildren({ isOpen: this.isOpen });
    button.setPropsAndChildren({ isActive: this.isOpen });
    this.setPropsAndChildren({ isOpen: this.isOpen });
  }
}

export default DialogButton;
