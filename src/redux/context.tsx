import { createContext, useRef, PropsWithChildren } from 'react';
import { IStore, Reducer } from './types';

export type IReduxContext<StateType> = {
  store: IStore<StateType>;
};

export const ReduxContext = createContext<IReduxContext<any> | undefined>(undefined);

export type ReduxContextProviderProps<StateType> = {
  initialState: StateType;
  rootReducer: Reducer<StateType>;
};

export function ReduxContextProvider<StateType>({
  initialState,
  rootReducer,
  children,
}: PropsWithChildren<ReduxContextProviderProps<StateType>>) {
  const storeRef = useRef({ state: initialState, rootReducer, history: [] });

  return <ReduxContext.Provider value={{ store: storeRef.current }}>{children}</ReduxContext.Provider>;
}
