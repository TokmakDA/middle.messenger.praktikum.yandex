import './style.scss';
import { TUpdateUserRequest } from '../../@types/api';

import { PROFILE_INPUT_FIELDS as profileInputs } from '../../lib/constants/formFieldConstants';
import avatarSVG from '../../assets/images/avatar.svg';
import Block from '../../tools/Block';
import { ProfileInput } from './profile-input';
import { ProfileFormBlock } from './profile-form';
import { connect } from '../../tools/connect';
// import { ChatsController } from '../../controllers';

class ProfileBlock extends Block {
  private count: number;
  constructor({ ...props }) {
    super({
      ...props,
      avatarSVG,
      profileForm: new ProfileFormBlock({
        inputList: profileInputs.map((field) => {
          return {
            input: new ProfileInput({
              ...field,
              // TODO Проверить на новом пользователе
              value: props.user[field.name as keyof TUpdateUserRequest], // || field.value,
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
  async componentDidMount() {
    this.count += 1;
    console.log(this.count);

    // await ChatsController.createChat({ title: 'NewChat' });
  }
}

export default connect(({ user }) => ({
  user,
}))(ProfileBlock);
