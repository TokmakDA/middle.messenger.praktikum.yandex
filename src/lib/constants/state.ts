// Начальное состояние приложения
import { AppState } from '../../@types/store';

export const INITIAL_STATE: AppState = {
  isLoading: false,
  isAuthorized: false,

  error: null,
  user: null,
  isEditionProfile: false,

  isOpenDialogChat: false,
  isOpenedModal: false,

  findUsers: [],
  findUser: null,
  currentChat: null, // TODO переписать
  chatList: [],
  chatUsers: [],
  messages: [],
};
