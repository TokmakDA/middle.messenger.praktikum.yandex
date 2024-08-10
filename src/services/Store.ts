import EventBus from '../tools/EventBus';
import cloneDeep from '../lib/utils/cloneDeep';

export enum StoreEvents {
  Updated = 'Updated',
}

export class Store<State extends Record<string, unknown>> extends EventBus {
  private state: State;

  constructor(defaultState: State) {
    super();
    this.state = cloneDeep(defaultState);
  }

  public getState(): State {
    return cloneDeep(this.state);
  }

  public set(nextState: Partial<State>): void {
    const prevState = cloneDeep(this.state);

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
