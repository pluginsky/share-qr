import { useContext, useEffect } from 'react';

import { StateContext } from '../context';

import { CLEAR_TEXT, SET_TEXT } from '../store/actions';

export const useText = () => {
  const [{ selectedText: text }, dispatch] = useContext(StateContext);

  const clearText = () => dispatch({ type: CLEAR_TEXT });

  const setText = (value: string) => {
    dispatch({ type: SET_TEXT, payload: value });
  };

  return { text, setText, clearText };
};
