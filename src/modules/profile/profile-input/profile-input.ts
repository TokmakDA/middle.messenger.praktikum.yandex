import Block from '../../../tools/Block';
import InputElement from './input-element';
import './style.scss';

class ProfileInput extends Block {
  constructor({ ...props }) {
    super({
      template: `
        <div class="input-container">
          <label class="input-container__label">
            {{ label }}
           {{{ input }}}
          </label>
          <span class="input-container__error">{{ error }}</span>
        </div>
      `,
      ...props,
      attr: false,
      input: new InputElement({ ...props }),
    });
  }
}

export default ProfileInput;
