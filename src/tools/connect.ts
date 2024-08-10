import { isEqual } from '../lib/utils/utils';
import { StoreEvents } from '../services/Store';
import Block from './Block';
import { AppState } from '../@types/store';
import cloneDeep from '../lib/utils/cloneDeep';

type PlainObject = Record<string, unknown>;
interface DispatchHandlers {
  [key: string]: (...args: unknown[]) => void;
}

/**
 * Функция высшего порядка для подключения компонента к хранилищу
 * @param mapStateToProps - Функция, преобразующая состояние хранилища в пропсы компонента
 * @param dispatch
 * @returns - Новый компонент с возможностью подписки на обновления состояния хранилища
 */
export function connect(
  mapStateToProps: (state: AppState) => Partial<AppState>,
  dispatch?: DispatchHandlers,
) {
  return function (Component: typeof Block) {
    return class extends Component {
      protected onChangeStoreCallback: () => void;
      private state: Partial<AppState> | undefined;

      constructor(props: PlainObject) {
        const { store } = window;
        const state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        // Обрабатываем функции dispatch
        const dispatchHandler: Partial<DispatchHandlers> = {};
        if (dispatch) {
          Object.entries(dispatch).forEach(([key, handler]) => {
            dispatchHandler[key] = (...args: unknown[]) => {
              handler(store.set.bind(store), ...args);
            };
          });
        }

        // Инициализируем базовый компонент с состоянием
        this.setPropsAndChildren({ ...state, ...dispatchHandler });

        // Обработчик изменения состояния хранилища
        this.onChangeStoreCallback = () => {
          const newState = cloneDeep(mapStateToProps(store.getState()));

          // Если состояние изменилось, обновляем пропсы компонента
          if (!isEqual(this.state, newState)) {
            this.setPropsAndChildren({ ...newState });
            this.state = newState; // Сохраняем новое состояние
          }
        };

        // Подписываемся на изменения в хранилище
        store.on(StoreEvents.Updated, this.onChangeStoreCallback.bind(this));
      }

      componentWillUnmount() {
        // Отписываемся от изменений в хранилище при размонтировании компонента
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
        super.componentWillUnmount();
      }
    };
  };
}
