import { useContext, useCallback } from 'react';

import { StateContext } from '../context';

import { SET_TEXT, CLEAR_TEXT } from '../store/actions';

import { StoreKey } from '../../shared/enums/StoreKey';

type SetTextCallbackType = (value: string) => void;

export const useText = () => {
  const [{ [StoreKey.SelectedText]: text }, dispatch] = useContext(
    StateContext
  );

  const setText = useCallback<SetTextCallbackType>(
    (value) => {
      dispatch({ type: SET_TEXT, payload: value });
    },
    [dispatch]
  );

  const clearText = useCallback(() => dispatch({ type: CLEAR_TEXT }), [
    dispatch,
  ]);

  return { text, setText, clearText };
};
