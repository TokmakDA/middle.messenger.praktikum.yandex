import Block from '../../../tools/Block';
import './style.scss';
import avatarSVG from '../../../assets/images/avatar.svg';
import URLS from '../../../lib/constants/urls';
import { TUserApi } from '../../../@types/api';
import { BlockProps } from '../../../@types/block';

interface ProfileAvatarProps extends BlockProps {
  user: TUserApi;
}
class ProfileAvatar extends Block {
  constructor(props: ProfileAvatarProps) {
    super({
      ...props,
      avatarSVG,
    });
  }
  render() {
    const { base, resources } = URLS;
    const url = `${base}${resources}${(this.props as ProfileAvatarProps).user.avatar}`;

    return `
        <div class="profile__avatar-wrapper">
          <img class="profile__avatar" src="{{#if user.avatar}} ${url} {{ else }} ${avatarSVG} {{/if}}" alt="аватар" />
        </div>
      `;
  }
}

export default ProfileAvatar;
