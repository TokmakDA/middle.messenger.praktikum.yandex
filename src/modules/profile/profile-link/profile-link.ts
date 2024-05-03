import Block from '../../../tools/Block';
import './style.scss';

class ProfileLink extends Block {
  constructor({ color = 'primary', ...props }) {
    super({
      ...props,
      template: `
        <div class="profile__link-container">
          <a href="{{url}}" class="profile__link ${color}">{{text}}</a>
        </div>
      `,
    });
  }
}

export default ProfileLink;
