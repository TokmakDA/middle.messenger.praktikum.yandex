import Block from '../../tools/Block';
import InputElement from './input-element';

export default class Input extends Block {
  constructor({ ...props }) {
    super({
      ...props,
      input: new InputElement({
        ...props,
      }),
    });
  }

  render() {
    return `
        <div class="input" data-error={{error}}>
          <label class="input__container" for="{{name}}">
            {{{ input }}}
            <div class="input__label">{{label}}</div>
          </label>
          <span class="input__error">{{error}}</span>
        </div>
      `;
  }
}
