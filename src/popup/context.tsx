import React, { useEffect, useReducer } from 'react';
import extension from 'extensionizer';

import { StoreKey } from '../shared/enums/StoreKey';
import { Tab } from '../shared/enums/Tab';

import { stateReducer } from './store/reducers';

import { INIT } from './store/actions';

interface StoreResponse {
  readonly [StoreKey.SelectedText]: string;
  readonly [StoreKey.CurrentTab]: Tab;
}

const initialState = {
  [StoreKey.SelectedText]: '',
  [StoreKey.CurrentTab]: null,
};

export const StateContext = React.createContext<[any, any]>([] as any);

export const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    extension.storage.local.get(
      [StoreKey.SelectedText, StoreKey.CurrentTab],
      (res: StoreResponse) => {
        if (Object.keys(res).length > 0) {
          dispatch({ type: INIT, payload: res });
        }
      }
    );
  }, []);

  useEffect(() => {
    extension.storage.local.set(state);
  }, [state]);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
