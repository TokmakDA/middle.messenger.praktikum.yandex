import { Button } from '../../../components';
import Block from '../../../tools/Block';
import { ProfileButton } from '../profile-button';
import { ProfileLink } from '../profile-link';
import './style.scss';
import CustomFormValidate from './validator';
import { UserAuthController } from '../../../controllers/auth.ts';

export default class ProfileFormBlock extends Block {
  validator: CustomFormValidate;

  constructor({ ...props }) {
    super({
      ...props,
      template: `
        <form class="profile__form"  name="profile" novalidate>
          <fieldset 
            {{#if isEditionProfile}}
            {{else}}
              disabled
            {{/if}} 
          >
            {{{ inputList }}}
          </fieldset>
          {{#if isEditionProfile }}
            {{{ submitButton }}}
          {{ else}}
          <div>{{{ links }}}</div>
          {{/if}}
        </form>

      `,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          const valid = this.validator.formValidate(e);
          if (valid) {
            this.setProps({ isEdition: false });
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
            onClick: () => {
              window.store.set({ isEditionProfile: true });
              this.setProps({ isEdition: true });
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
          link: new ProfileButton({
            text: 'Выйти',
            color: 'warning',
            onClick: async () => {
              await UserAuthController.logout();
            },
          }),
        },
      ],
    });

    this.validator = new CustomFormValidate();
  }
}
