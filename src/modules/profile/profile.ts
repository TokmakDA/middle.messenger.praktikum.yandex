import './style.scss';
// import sidebar from '../../layouts/sidebar';

import { PROFILE_INPUTS } from '../../temp/data';
import avatarSVG from '../../assets/images/avatar.svg';
import Block from '../../tools/Block';
import { ProfileInput } from './profile-input';
import { ProfileFormBlock } from './profile-form';

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
      isEdition: true,

      ...props,
      profileForm: new ProfileFormBlock({
        ...props,
        inputList: PROFILE_INPUTS.map((prop) => ({
          inpit: new ProfileInput({ ...prop }),
        })),
      }),
      avatarSVG,
    });
  }
}

export default ProfileBlock;
