import './style.scss';
import { TUpdateUserRequest, TUserApi } from '../../@types/api';

import { PROFILE_INPUT_FIELDS as profileInputs } from '../../lib/constants/formFieldConstants';
import avatarSVG from '../../assets/images/avatar.svg';
import Block from '../../tools/Block';
import { ProfileInput } from './profile-input';
import { ProfileFormBlock } from './profile-form';
import { connect } from '../../tools/connect';
import { AppState } from '../../@types/store';
import { InputField } from '../../@types/types';


class ProfileBlock extends Block {
  constructor(props: { [x: string]: unknown; user: TUserApi | null }) {
    super({
      ...props,
      avatarSVG,
      profileForm: new ProfileFormBlock({
        inputList: profileInputs.map((field) => ({
          input: new ProfileInput({
            ...field,
            // TODO Проверить на новом пользователе
            value: props.user
              ? props.user[field.name as keyof TUpdateUserRequest]
              : field.value,
          }),
        })),
      }),
      template: `
        <section class="profile">
          <div class="profile__container">
            <div class="profile__top">
              <div class="profile__avatar-wrapper">
                <img class="profile__avatar" src="${avatarSVG}" alt="аватар" />
              </div>
              <h1 class="profile__title">
                {{ user.first_name }}
              </h1>
            </div>
            {{{ profileForm }}}
          </div>
        </section>
      `,
    });
    this.count = 0;
  }

  getFieldComponent(field: InputField, user: TUserApi | null) {
    return {
      input: new ProfileInput({
        ...field,
        // TODO Проверить на новом пользователе
        value: user
          ? user[field.name as keyof TUpdateUserRequest]
          : field.value,
      }),
    };
  }

  updateUserField() {
    const props = this.props as AppState;
    return {
      ...props,
      profileForm: new ProfileFormBlock({
        inputList: profileInputs.map((field) =>
          this.getFieldComponent(field, props.user),
        ),
      }),
    };
  }
  async componentDidMount() {
    this.updateUserField();
    this.setPropsAndChildren(this.updateUserField());
  }
}

export default connect(({ user, isEditionProfile }) => ({
  user,
  isEditionProfile,
}))(ProfileBlock);
