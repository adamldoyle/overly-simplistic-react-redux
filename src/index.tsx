import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ReduxContextProvider } from './redux/context';
import { Reducer } from './redux/types';
import { IRootState } from './types';

const initialState: IRootState = {
  allNodes: {},
  rootNodes: [],
};

const getNextId = (state: IRootState, prefix: string): string => {
  let i = 0;
  do {
    i++;
  } while (state.allNodes[`${prefix}-${i}`]);
  return `${prefix}-${i}`;
};

const rootReducer: Reducer<IRootState> = (state, action) => {
  switch (action.type) {
    case 'ADD_NODE': {
      const parentId: string | undefined = (action.payload as any).parentId;
      if (!parentId) {
        const id = getNextId(state, `node`);
        return { ...state, allNodes: { ...state.allNodes, [id]: [] }, rootNodes: [...state.rootNodes, id] };
      }

      const id = getNextId(state, parentId);
      return { ...state, allNodes: { ...state.allNodes, [id]: [], [parentId]: [...state.allNodes[parentId], id] } };
    }
  }
  return state;
};

ReactDOM.render(
  <React.StrictMode>
    <ReduxContextProvider initialState={initialState} rootReducer={rootReducer}>
      <App />
    </ReduxContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
