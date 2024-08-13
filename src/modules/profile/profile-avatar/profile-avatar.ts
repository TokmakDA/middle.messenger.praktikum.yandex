import Block from '../../../tools/Block';
import './style.scss';
import avatarSVG from '../../../assets/images/avatar.svg';

class ProfileAvatar extends Block {
  constructor({ ...props }) {
    super({
      ...props,
      avatarSVG,
      template: `
        <div class="profile__avatar-wrapper">
          <img class="profile__avatar" src="{{#if user.avatar}} user.avatar {{ else }} ${avatarSVG} {{/if}}" alt="аватар" />
        </div>
      `,
    });
  }
}

export default ProfileAvatar;
