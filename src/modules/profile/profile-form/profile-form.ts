import { Button } from '../../../components';
import Block from '../../../tools/Block';
import { ProfileButton } from '../profile-button';
import { ProfileLink } from '../profile-link';
import './style.scss';
import CustomFormValidate from './validator';

export default class ProfileFormBlock extends Block {
  validator: CustomFormValidate;

  constructor({ ...props }) {
    super({
      ...props,
      template: `
        <form class="profile__form"  name="profile" novalidate>
          <fieldset 
            {{#if isEdition}}
            {{else}}
              disabled
            {{/if}} 
          >
            {{{ inputList }}}
          </fieldset>
          {{#if isEdition }}
            {{{ submitButton }}}
          {{ else}}
          <div>{{{ links }}}</div>
          {{/if}}
        </form>

      `,
      isEdition: true,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          const valid = this.validator.formValidate(e);
          if (valid) {
            this.setProps({ isEdition: false, isDisabled: true });
          }
        },
      },
      submitButton: new Button({
        type: 'submit',
        text: 'сахранить',
      }),
      links: [
        {
          buttonLink: new ProfileButton({
            text: 'Изменить данные',
            type: 'button',
            events: {
              click: () => {
                this.setProps({ isEdition: true, isDisabled: false });
              },
            },
          }),
        },
        {
          link: new ProfileLink({
            text: 'Изменить пароль',
            url: '/profile-pass',
          }),
        },
        {
          link: new ProfileLink({
            text: 'Выйти',
            url: '/signin',
            color: 'warning',
          }),
        },
      ],
    });

    this.validator = new CustomFormValidate();
  }
}
