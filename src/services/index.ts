import { Store } from './Store';
import { AppState } from '../@types/store';
import { INITIAL_STATE } from '../lib/constants/state';

// Создание единственного экземпляра Store с начальным состоянием
const store = new Store(INITIAL_STATE);

// Объявление глобальной переменной store для доступа к ней из любого места
declare global {
  interface Window {
    store: Store<AppState>;
  }
}

// Установка глобальной переменной store
window.store = store;

// Экспортирование экземпляра store
export default store;
