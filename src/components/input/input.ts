import Block from '../../tools/Block';
import InputElement from './input-element';

export default class Input extends Block {
  constructor({ ...props }) {
    super({
      ...props,
      attr: false,
      template: `
        <div class="input">
          <div class="input__container" >
            {{{ input }}}
            <label class="input__label"  for='{{ name }}' >{{ label }}</label>
          </div>
          <span class="input__error">{{ error }}</span>
        </div>
      `,
      input: new InputElement({
        ...props,
      }),
    });
  }
}
