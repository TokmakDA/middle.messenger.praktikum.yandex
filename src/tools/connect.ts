import { isEqual } from './utils';
import { StoreEvents } from '../services/Store';
import Block from './Block';
import { AppState } from '../@types/types';

export function connect(
  mapStateToProps: (state: AppState) => Partial<AppState>,
) {
  return function (Component: typeof Block) {
    return class extends Component {
      protected onChangeStoreCallback: () => void;

      constructor(props: { [x: string]: never }) {
        const { store } = window;

        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        this.onChangeStoreCallback = () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          // не забываем сохранить новое состояние
          state = newState;
        };

        // подписываемся на событие
        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      componentWillUnmount() {
        super.componentWillUnmount();
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}
