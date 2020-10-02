import React, { useEffect, useReducer } from 'react';
import extension from 'extensionizer';

import { StoreKey } from '../shared/enums/StoreKey';
import { Tab } from '../shared/enums/Tab';

import { stateReducer } from './store/reducers';

import { INIT } from './store/actions';

import { PopupState } from './interfaces';

import type { ActionTypes } from './types';

const initialState = {
  [StoreKey.SelectedText]: '',
  [StoreKey.CurrentTab]: undefined,
};

export const StateContext = React.createContext<
  [PopupState, React.Dispatch<ActionTypes>]
>([initialState, () => null]);

interface Props {
  readonly children: React.ReactNode;
}

export const StateProvider = ({ children }: Props) => {
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
  }, []);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
