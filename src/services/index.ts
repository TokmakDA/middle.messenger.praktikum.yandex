import { Store } from './Store.ts';
import { AppState } from '../@types/types';

// Начальное состояние приложения
const initialState = {
  isLoading: false,
  error: null,
  user: null,
  isOpenDialogChat: false,
  chats: [],
};

// Создание единственного экземпляра Store с начальным состоянием
const store = new Store(initialState);

// Объявление глобальной переменной store для доступа к ней из любого места
declare global {
  interface Window {
    store: Store<AppState>;
  }
}

// // Установка глобальной переменной store
// window.store = store;

// Экспортирование экземпляра store
export default store;
