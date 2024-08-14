import './style.scss';
import { TUserApi } from '../../@types/api';

import Block from '../../tools/Block';
import { ProfileFormBlock } from './profile-form';
import { ProfileAvatar } from './profile-avatar';
import { connect } from '../../tools/connect';
import { AddUsersAvatar } from '../modals';
import { BlockProps } from '../../@types/block';

interface ProfileBlockProps extends BlockProps {
  user: TUserApi;
}

class ProfileBlock extends Block {
  constructor(props: ProfileBlockProps) {
    super({
      ...props,
      profileForm: new ProfileFormBlock({}),
      profileAvatar: new ProfileAvatar({
        user: props.user,
        events: {
          click: () => {
            this.openAddingUsersAvatar();
          },
        },
      }),
      addUsersAvatarModal: new AddUsersAvatar({
        handleClose: () => {
          this.closeAddingUsersAvatar();
        },
      }),

      template: `
        <section class="profile">
          <div class="profile__container">
            <div class="profile__top">
              {{{ profileAvatar }}}
              <h1 class="profile__title">
                {{ user.first_name }}
              </h1>
            </div>
            {{{ profileForm }}}
          </div>
          
          {{{ addUsersAvatarModal }}}
        </section>
      `,
    });
    this.count = 0;
  }

  // Управление модалкой Добавления Аватар Юзера
  openAddingUsersAvatar() {
    this.updateAddingUsersAvatarProps(true);
  }
  closeAddingUsersAvatar() {
    this.updateAddingUsersAvatarProps();
  }
  updateAddingUsersAvatarProps(value = false) {
    const { addUsersAvatarModal, profileAvatar } = this.children;
    addUsersAvatarModal.setPropsAndChildren({ isOpen: value });
    profileAvatar.setPropsAndChildren({
      user: (this.props as ProfileBlockProps).user,
    });
  }
}

export default connect(({ user }) => ({
  user,
}))(ProfileBlock);
