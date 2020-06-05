import { useContext } from 'react';

import { StateContext } from '../context';

import { CLEAR_TEXT, SET_TEXT } from '../store/actions';

export const useText = () => {
  const [{ selectedText: text }, dispatch] = useContext(StateContext);

  const setText = (value: string) => {
    dispatch({ type: SET_TEXT, payload: value });
  };

  const clearText = () => dispatch({ type: CLEAR_TEXT });

  return { text, setText, clearText };
};
