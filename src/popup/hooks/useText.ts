import { useCallback } from 'react';
import { useSafeContext } from 'react-safe-context-hooks';

import { StateContext } from '../context';

import { SET_TEXT, CLEAR_TEXT } from '../store/actions';

import { StoreKey } from '../../shared/constants/StoreKey';

type SetTextCallback = (value: string) => void;

export const useText = () => {
  const [{ [StoreKey.SelectedText]: text }, dispatch] =
    useSafeContext(StateContext);

  const setText = useCallback<SetTextCallback>(
    (value) => dispatch({ type: SET_TEXT, payload: value }),
    [dispatch]
  );

  const clearText = useCallback(
    () => dispatch({ type: CLEAR_TEXT }),
    [dispatch]
  );

  return { text, setText, clearText };
};
