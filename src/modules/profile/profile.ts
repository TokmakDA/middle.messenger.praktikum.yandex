import './style.scss';

import { PROFILE_INPUTS } from '../../temp/data';
import avatarSVG from '../../assets/images/avatar.svg';
import Block from '../../tools/Block';
import { ProfileInput } from './profile-input';
import { ProfileFormBlock } from './profile-form';
import { connect } from '../../tools/connect';

class ProfileBlock extends Block {
  constructor({ ...props }) {
    super({
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
      ...props,
      profileForm: new ProfileFormBlock({
        ...props,
        inputList: PROFILE_INPUTS.map((prop) => {
          return {
            input: new ProfileInput({
              ...prop,
              value: props.user?.[prop.name] || prop.value,
            }),
          };
        }),
      }),
      avatarSVG,
    });
  }
}

export default connect(({ isEditionProfile }) => ({
  isEditionProfile,
}))(ProfileBlock as typeof Block);
