import Block from '../../../tools/Block';
import './style.scss';

class ProfileInput extends Block {
  constructor({ ...props }) {
    super({
      template: `
        <div class="input-container">
          <label class="input-container__label">
            {{label}}
            <input
              type="{{type}}"
              class="input-container__input"
              id="{{name}}"
              placeholder="{{label}}"
              value="{{value}}"
              name="{{name}}"
              required
            />
          </label>

          {{#if error}}
          <span class="input-container__error">{{error}}</span>
          {{/if}}
        </div>
      `,
      ...props,
    });
  }
}

export default ProfileInput;
