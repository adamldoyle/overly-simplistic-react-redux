export type Action = {
  type: string;
  payload: unknown;
};

export type Reducer<StateType> = {
  (state: StateType, action: Action): StateType;
};

export type Dispatch = {
  (action: Action): void;
};

export type Selector<StateType, ReturnType> = {
  (state: StateType): ReturnType;
};

export type IStore<StateType> = {
  state: StateType;
  rootReducer: Reducer<StateType>;
  history: Action[];
};
