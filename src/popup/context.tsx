import { useEffect, useReducer } from 'react';
import * as React from 'react';
import extension from 'extensionizer';

import { StoreKey } from '../shared/constants/StoreKey';
import { Tab } from '../shared/constants/Tab';

import { stateReducer } from './store/reducers';

import { INIT } from './store/actions';

import type { PopupState, ActionTypes } from './types';

const initialState = {
  [StoreKey.SelectedText]: '',
  [StoreKey.CurrentTab]: undefined,
};

export const StateContext = React.createContext<
  [PopupState, React.Dispatch<ActionTypes>]
>([initialState, () => null]);

interface StateProviderProps {
  readonly children: React.ReactNode;
}

export const StateProvider = ({ children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    extension.storage.local.get(
      [StoreKey.SelectedText, StoreKey.CurrentTab],
      (res: PopupState) => {
        if (!res[StoreKey.CurrentTab]) {
          res[StoreKey.SelectedText] = '';
          res[StoreKey.CurrentTab] = Tab.Url;
        }

        dispatch({ type: INIT, payload: res });
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
