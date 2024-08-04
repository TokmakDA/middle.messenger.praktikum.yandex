// eslint-disable-next-line import/no-unresolved
import { ChatUser, TChat, TUserApi } from './api';

export type AppState = {
  isLoading: boolean;
  isAuthorized: boolean;

  error: string | null;
  user: TUserApi | null;
  isEditionProfile: boolean;

  isOpenDialogChat: boolean;

  findUsers: TUserApi[];
  findUser: TUserApi | null;
  currentChat: null; // TODO переписать
  chatList: TChat[];
  chatUsers: ChatUser[];
};
