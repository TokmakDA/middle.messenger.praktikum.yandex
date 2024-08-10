import Block from '../../../../tools/Block';
import './style.scss';
import { MessageBlock } from './message';
import { WebSocketResponseMessage } from '../../../../@types/socket';
import { connect } from '../../../../tools/connect';
import store from '../../../../services';
import { StoreEvents } from '../../../../services/Store';
import { AppState } from '../../../../@types/store';

class DialogBlock extends Block {
  constructor({ ...props }) {
    super({
      ...props,
    });

    store.on(StoreEvents.Updated, this.handleStoreUpdate.bind(this));
  }

  handleStoreUpdate() {
    // Обновляем пропсы и перерисовываем компонент
    const state = store.getState();
    const messageList = this.getMessageListFromProps(state);
    // Обновляем пропсы и перерисовываем компонент
    this.setPropsAndChildren({
      ...this.props,
      messageList: messageList.length > 0 ? messageList : [],
    });
  }

  componentWillUnmount() {
    // Отписываемся от событий при размонтировании компонента
    store.off(StoreEvents.Updated, this.handleStoreUpdate);
  }

  // получаем список с компонентами сообщений
  getMessageListFromProps(props: AppState) {
    return (
      props.messages?.map((messageItem: WebSocketResponseMessage) => ({
        message: new MessageBlock({ ...messageItem, user: props.user }),
      })) || []
    );
  }

  render() {
    const { messages } = this.props as AppState;
    const hasMessages = messages?.length > 0;

    return `
      <div class="chat__correspondence">
        {{#if ${hasMessages} }}
          {{{messageList}}} 
        {{/if}}
      </div>
    `;
  }
}

// export default DialogBlock;
export default connect(({ currentChat, user, messages }) => ({
  currentChat,
  messages,
  user,
}))(DialogBlock);
