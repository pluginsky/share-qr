import React, { useEffect, useReducer } from 'react';
import extension from 'extensionizer';

import { StoreKey } from '../shared/enums/StoreKey';
import { Tab } from '../shared/enums/Tab';

import { stateReducer } from './store/reducers';

import { INIT } from './store/actions';

export interface PopupState {
  [StoreKey.SelectedText]: string;
  [StoreKey.CurrentTab]: Tab;
}

const initialState = {
  [StoreKey.SelectedText]: '',
  [StoreKey.CurrentTab]: undefined,
};

export const StateContext = React.createContext<
  [PopupState, React.Dispatch<any>]
>([initialState, () => null]);

export const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    extension.storage.local.get(
      [StoreKey.SelectedText, StoreKey.CurrentTab],
      (res: PopupState) => {
        const data = res;

        if (!data[StoreKey.CurrentTab]) {
          data[StoreKey.SelectedText] = '';
          data[StoreKey.CurrentTab] = Tab.Url;
        }

        dispatch({ type: INIT, payload: data });
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
