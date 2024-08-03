import { isEqual } from '../lib/utils/utils';
import { StoreEvents } from '../services/Store';
import Block from './Block';
import { AppState } from '../@types/types';

/**
 * Функция высшего порядка для подключения компонента к хранилищу
 * @param mapStateToProps - Функция, преобразующая состояние хранилища в пропсы компонента
 * @returns - Новый компонент с возможностью подписки на обновления состояния хранилища
 */
export function connect(
  mapStateToProps: (state: AppState) => Partial<AppState>,
) {
  return function (Component: typeof Block) {
    return class extends Component {
      protected onChangeStoreCallback: () => void;

      constructor(props: { [x: string]: never }) {
        const { store } = window;

        // Сохраняем начальное состояние
        let state = mapStateToProps(store.getState());

        // Инициализируем базовый компонент с состоянием
        super({ ...props, ...state });

        // Обработчик изменения состояния хранилища
        this.onChangeStoreCallback = () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());

          // Если состояние изменилось, обновляем пропсы компонента
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          // не забываем сохранить новое состояние
          state = newState;
        };

        // Подписываемся на изменения в хранилище
        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      componentWillUnmount() {
        super.componentWillUnmount();
        // Отписываемся от изменений в хранилище при размонтировании компонента
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}
