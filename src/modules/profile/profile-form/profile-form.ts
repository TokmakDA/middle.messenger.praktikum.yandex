import { Button } from '../../../components';
import Block from '../../../tools/Block';
import { ProfileButton } from '../profile-button';
// import { ProfileLink } from '../profile-link';
import CustomFormValidate from './validator';
import { UserAuthController, UserController } from '../../../controllers';
import { connect } from '../../../tools/connect';
import { TUpdateUserRequest } from '../../../@types/api';

class ProfileFormBlock extends Block {
  private validator: CustomFormValidate;
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
          {{else}}
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
        // {
        //   link: new ProfileLink({
        //     text: 'Изменить пароль',
        //     url: '/profile-pass',
        //   }),
        // },
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
    const valid = this.validator.formValidate(e);
    if (valid) {
      const formData = this.validator.giveFieldData();
      const data: TUpdateUserRequest = {
        email: formData.email,
        display_name: formData.display_name,
        login: formData.login,
        phone: formData.phone,
        first_name: formData.first_name,
        second_name: formData.second_name,
      };
      await UserController.updateProfile(data);
    }
  }

  componentWillUnmount() {
    this.handleEdition(false);
  }
}

export default connect(({ isEditionProfile }) => ({
  isEditionProfile,
}))(ProfileFormBlock);
