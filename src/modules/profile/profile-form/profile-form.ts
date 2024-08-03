import { Button } from '../../../components';
import Block from '../../../tools/Block';
import { ProfileButton } from '../profile-button';
import { ProfileLink } from '../profile-link';
import './style.scss';
import CustomFormValidate from './validator';
import { UserAuthController } from '../../../controllers/Auth';
import { connect } from '../../../tools/connect';
import { UserController } from '../../../controllers/User';

class ProfileFormBlock extends Block {
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
        submit: (e: SubmitEvent) => this.handleSubmit(e),
      },
      submitButton: new Button({
        type: 'submit',
        text: 'Сохранить',
      }),
      links: [
        {
          buttonLink: new ProfileButton({
            text: 'Изменить данные',
            type: 'button',
            onClick: () => this.handleEdition(true),
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
            onClick: () => this.handleLogOut(),
          }),
        },
      ],
    });

    this.validator = new CustomFormValidate();
  }
  handleEdition(value: boolean) {
    window.store.set({
      isEditionProfile: value,
    });
  }

  async handleLogOut() {
    await UserAuthController.logout();
  }

  async handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    console.log(e);
    const valid = this.validator.formValidate(e);
    if (valid) {
      const formData = this.validator.giveFieldData();

      await UserController.updateProfile({
        email: formData.email,
        display_name: formData.display_name,
        login: formData.login,
        phone: formData.phone,
        first_name: formData.first_name,
        second_name: formData.second_name,
      });
    }
  }
}

export default connect(({ isEditionProfile }) => ({
  isEditionProfile,
}))(ProfileFormBlock as typeof Block);
