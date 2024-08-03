import './style.scss';

import { PROFILE_INPUT_FIELDS as profileInputs } from '../../lib/constants/formFieldConstants';
import avatarSVG from '../../assets/images/avatar.svg';
import Block from '../../tools/Block';
import { ProfileInput } from './profile-input';
import { ProfileFormBlock } from './profile-form';
import { connect } from '../../tools/connect';
import { User } from '../../@types/types';

class ProfileBlock extends Block {
  constructor({ ...props }) {
    super({
      ...props,
      avatarSVG,
      profileForm: new ProfileFormBlock({
        inputList: profileInputs.map((field) => {
          return {
            input: new ProfileInput({
              ...field,
              value: props.user?.[field.name as keyof User] || field.value,
            }),
          };
        }),
      }),
      template: `
        <section class="profile">
          <div class="profile__container">
            <div class="profile__top">
              <div class="profile__avatar-wrapper">
                <img class="profile__avatar" src="${avatarSVG}" alt="аватар" />
              </div>
              <h1 class="profile__title">Иван</h1>
            </div>
            {{{ profileForm }}}
          </div>
        </section>
      `,
    });
  }
}

export default connect(({ user }) => ({
  user,
}))(ProfileBlock as typeof Block);
