import Block from '../../../tools/Block';
import './style.scss';

class ProfileButton extends Block {
  color = 'primary';

  constructor({ color = 'primary', ...props }) {
    super({
      ...props,
      template: `
        <div class="profile__button-container">
          <button type="{{ type }}" class="profile__button ${color}">{{text}}</button>
        </div>
      `,
    });
  }
}

export default ProfileButton;
