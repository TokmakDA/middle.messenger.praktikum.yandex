import './style.scss';
// import sidebar from '../../layouts/sidebar';

import { PROFILE_INPUTS, PROFILE_LINKS } from '../../temp/data';
import avatarSVG from '../../assets/images/avatar.svg';
import Block from '../../tools/Block';
import { ProfileLink } from './profile-link';
import { ProfileInput } from './profile-input';

class ProfileBlock extends Block {
  constructor({ ...props }) {
    super({
      template: `
        <section class="profile">
          <div class="profile__container">
            <div class="profile__top">
              <div class="profile__avatar-wrapper">
                <img class="profile__avatar" src="{{ avatarSVG }}" alt="аватар" />
              </div>
              <h1 class="profile__title">Иван</h1>
            </div>
            <form class="profile__form">
              <fieldset disabled>
                {{{ inputs }}}
              </fieldset>
              {{! тут будет кнопка}}
            </form>
            <div>{{{ links }}}</div>
          </div>
        </section>
      `,
      ...props,
      inputs: PROFILE_INPUTS.map((prop) => ({
        inpit: new ProfileInput({ ...prop }),
      })),
      links: PROFILE_LINKS.map((prop) => ({
        link: new ProfileLink({ ...prop }),
      })),
      avatarSVG,
    });
  }
}

export default ProfileBlock;
