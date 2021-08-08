import { useEffect, useReducer, useRef } from 'react';
import * as React from 'react';
import extension from 'extensionizer';

import { StoreKey } from '../shared/constants/StoreKey';
import { Tab } from '../shared/constants/Tab';

import { stateReducer } from './store/reducers';

import { INIT } from './store/actions';

import type { PopupState, ActionTypes } from './types';

// TODO
// const initialState: PopupState = {
const initialState = {
  [StoreKey.SelectedText]: '',
  [StoreKey.CurrentTab]: undefined,
} as unknown as PopupState;

export const StateContext = React.createContext<
  [PopupState, React.Dispatch<ActionTypes>] | undefined
>(undefined);

interface StateProviderProps {
  readonly children: React.ReactNode;
}

export const StateProvider = ({ children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const isMounted = useRef(true);

  useEffect(() => {
    extension.storage.local.get(
      [StoreKey.SelectedText, StoreKey.CurrentTab],
      (res: PopupState) => {
        if (!isMounted) {
          return;
        }

        if (!res[StoreKey.CurrentTab]) {
          res[StoreKey.SelectedText] = '';
          res[StoreKey.CurrentTab] = Tab.Url;
        }

        dispatch({ type: INIT, payload: res });
      }
    );

    return () => void (isMounted.current = false);
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
