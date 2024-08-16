import { Button } from '../../../components';
import Block from '../../../tools/Block';
import { ProfileButton } from '../profile-button';
import CustomFormValidate from './validator';
import { UserAuthController, UserController } from '../../../controllers';
import { connect } from '../../../tools/connect';
import {
  TChangePasswordRequest,
  TUpdateUserRequest,
  TUserApi,
} from '../../../@types/api';
import { InputField, TFormData } from '../../../@types/types';
import { AppState } from '../../../@types/store';
import { BlockProps, Children } from '../../../@types/block';

import { ProfileInput } from '../profile-input';
import {
  PROFILE_INPUT_FIELDS as profileInputs,
  PASS_INPUTS as passwordInputsList,
} from '../../../lib/constants/formFieldConstants';

interface IProfileFormBlockProps extends BlockProps {
  user: AppState['user'];
  isEditionProfile: boolean;
  isEditPassword: boolean;
  isEdition: boolean;
  inputList: Children[] | Block;
  links: Children[] | Block;
  submitButton: Button;
}

class ProfileFormBlock extends Block {
  private validator: CustomFormValidate;

  constructor(props: IProfileFormBlockProps) {
    super({
      ...props,
      isEditPassword: false,
      isEditionProfile: false,
      isEdition: false,
      events: {
        submit: (e: SubmitEvent) => this.handleSubmit(e),
      },

      submitButton: new Button({
        type: 'submit',
        text: 'Сохранить',
        flat: true,
      }),
      cancelChangeButton: new Button({
        type: 'button',
        text: 'Отмена',
        events: {
          click: (e: Event) => {
            e.preventDefault();
            this.handleEdition(false);
          },
        },
      }),

      template: `
        <form class="profile__form"  name="profile" novalidate>
          <fieldset 
            {{#if isEdition }}
            {{else}}
              disabled
            {{/if}} 
          > 
            {{{ inputList }}}
          </fieldset>
          {{#if isEdition }}
            <div class="profile__actions-wrapper">
              {{{ submitButton }}}
              {{{ cancelChangeButton }}}
            </div>
          {{else}}
            <div>
              {{{ links }}}
            </div>
          {{/if}}
        </form>
      `,
    });

    this.validator = new CustomFormValidate();
  }

  getFields(fields: InputField[], user?: TUserApi | null) {
    return fields.map((field) => ({
      input: new ProfileInput({
        ...field,
        value: user
          ? user[field.name as keyof TUpdateUserRequest]
          : field.value,
      }),
    }));
  }

  getLinks() {
    return [
      {
        buttonLink: new ProfileButton({
          text: 'Изменить данные',
          type: 'button',
          onClick: () => this.handleEdition(true),
        }),
      },
      {
        link: new ProfileButton({
          text: 'Изменить пароль',
          type: 'button',
          onClick: () => this.handleEditPassword(true),
        }),
      },
      {
        link: new ProfileButton({
          text: 'Выйти',
          color: 'warning',
          onClick: () => this.handleLogOut(),
        }),
      },
    ];
  }

  updateUserField(isEditPassword = false) {
    const props = this.props as IProfileFormBlockProps;
    return isEditPassword
      ? this.getFields(passwordInputsList)
      : this.getFields(profileInputs, props.user);
  }

  async componentDidMount() {
    this.setPropsAndChildren({
      ...this.props,
      inputList: this.updateUserField(),
      links: this.getLinks(),
    });
  }

  handleEdition(value: boolean) {
    this.setPropsAndChildren({
      isEditionProfile: value,
      isEdition: value,
      isEditPassword: false,
      inputList: this.updateUserField(),
    });
  }
  handleEditPassword(value: boolean) {
    this.setPropsAndChildren({
      isEditPassword: value,
      isEdition: value,
      isEditionProfile: false,
      inputList: this.updateUserField(true),
    });
  }

  async handleLogOut() {
    await UserAuthController.logout();
  }

  async sendProfile(formData: TFormData) {
    const data: TUpdateUserRequest = {
      email: formData.email,
      display_name: formData.display_name,
      login: formData.login,
      phone: formData.phone,
      first_name: formData.first_name,
      second_name: formData.second_name,
    };
    await UserController.updateProfile(data);
    this.handleEdition(false);
  }

  async sendPassword(formData: TFormData) {
    const data: TChangePasswordRequest = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    };
    await UserController.updatePassword(data);
    this.handleEdition(false);
  }

  async handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const valid = this.validator.formValidate(e);
    if (valid) {
      const formData = this.validator.giveFieldData();

      const { isEditPassword, isEditionProfile } = this
        .props as IProfileFormBlockProps;

      if (isEditionProfile) {
        await this.sendProfile(formData);
      } else if (isEditPassword) {
        await this.sendPassword(formData);
      }
    }
  }

  componentWillUnmount() {
    this.setPropsAndChildren({
      isEditionProfile: false,
      isEdition: false,
      isEditPassword: false,
      inputList: this.updateUserField(),
    });
  }
}

export default connect(({ user, isEditionProfile }) => ({
  user,
  isEditionProfile,
}))(ProfileFormBlock);
