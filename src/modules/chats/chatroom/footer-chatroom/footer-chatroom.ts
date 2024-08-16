import Block from '../../../../tools/Block';
import './style.scss';
import { FormMessage } from './formMessage';
import { SendChatMedia } from '../../../modals';

class FooterChatroomBlock extends Block {
  constructor({ ...props }) {
    super({
      template: `
        <div class="chat__footer">
          {{{ formMessage }}}
          {{{ addMediaModal }}}
        </div>
      `,
      ...props,
      formMessage: new FormMessage({
        ...props,
        handleSendChatMedia: () => this.openSendingChatMedia(),
      }),
      addMediaModal: new SendChatMedia({
        handleClose: () => this.closeSendingChatMedia(),
      }),
    });
  }

  openSendingChatMedia() {
    this.updateSendingChatMediaProps(true);
  }
  closeSendingChatMedia() {
    this.updateSendingChatMediaProps();
  }
  updateSendingChatMediaProps(value = false) {
    const { addMediaModal } = this.children;
    addMediaModal.setPropsAndChildren({ isOpen: value });
  }
}

export default FooterChatroomBlock;
