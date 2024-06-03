import {isEqual} from './utils.ts';
import {StoreEvents} from "../services/Store.ts";
import Block from "./Block.ts";

export function connect(mapStateToProps: (state: Indexed) => Indexed, dispatch?:) {
  return function (Component: typeof Block) {
    return class extends Component {
      private onChangeStoreCallback: () => void;
      constructor(props) {
        const store = window.store;
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        const dispatchHundler = {};
        Object.entries(dispatch || {}).forEach(([key, hundler]) => {
          dispatchHundler[key] = (...args) =>
            hundler(window.store.set.bind(window.store), ...args);
        });

        this.setProps({ ...dispatchHundler });

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
