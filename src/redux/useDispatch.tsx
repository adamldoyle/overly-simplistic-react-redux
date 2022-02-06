import { useProvidedContext } from '@adamldoyle/use-provided-context';
import { useCallback } from 'react';
import { ReduxContext } from './context';
import { Action, Dispatch } from './types';

export const useDispatch = (): Dispatch => {
  const { store } = useProvidedContext(ReduxContext);

  const dispatch = useCallback(
    (action: Action) => {
      store.history.push(action);
      const newState = store.rootReducer(store.state, action);
      if (newState !== store.state) {
        store.state = newState;
        window.dispatchEvent(new Event('redux:state:change'));
      }
    },
    [store],
  );

  return dispatch;
};
