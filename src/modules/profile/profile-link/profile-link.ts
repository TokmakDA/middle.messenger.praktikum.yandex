import Block from '../../../tools/Block';
import './style.scss';

class ProfileLink extends Block {
  constructor({ ...props }) {
    super({
      ...props,
      template: `
        <div class="profile__link-container">
          {{#if natural}}
          <a href="{{url}}" class="profile__link profile__link_neutral">{{text}}</a>
          {{else}}
          <a href="{{url}}" class="profile__link profile__link_negative">{{text}}</a>
          {{/if}}
        </div>
      `,
    });
  }
}

export default ProfileLink;
