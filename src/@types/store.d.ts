import { ChatUser, TChatCard, TUserApi } from './api';
import { WebSocketResponseMessage } from './socket';

export type AppState = {
  isLoading: boolean;
  isAuthorized: boolean;

  error: string | null;
  user: TUserApi | null;
  isEditionProfile: boolean;

  isOpenDialogChat: boolean;
  isOpenedModal: boolean;

  findUsers: TUserApi[];
  findUser: TUserApi | null;
  currentChat: TChatCard | null;
  chatList: TChatCard[];
  chatUsers: ChatUser[];
  messages: WebSocketResponseMessage[];
};
