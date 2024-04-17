import Block from '../../../../tools/Block';
import template from './tpl.hbs?raw';
import './style.scss';

class FooterChatsBlock extends Block {
  constructor({ ...props }) {
    super({
      template,
      ...props,
      events: {
        // change: (e: { target: { value: any } }) =>
        //   props.onChange(e.target.value),
        // blur: (e: any) => {
        //   props.onBlur(e.target.value);
        // },
        // submit: (value) => props.onSubmit(value),
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  validate(e: any) {
    // eslint-disable-next-line no-console
    console.log('blur', e);
  }
}

export default FooterChatsBlock;
