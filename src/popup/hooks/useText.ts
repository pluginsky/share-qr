import { useContext, useEffect } from 'react';

import { StateContext } from '../context';

import { CLEAR_TEXT, SET_TEXT } from '../store/actions';

export const useText = () => {
  const [{ selectedText: text }, dispatch] = useContext(StateContext);

  const clearText = () => dispatch({ type: CLEAR_TEXT });

  const setText = (value: string) => {
    dispatch({ type: SET_TEXT, payload: value });
  };

  useEffect(() => {
    window.addEventListener('paste', (e: ClipboardEvent) => {
      // if () // TODO switch to text tab if is not active
      setText(e.clipboardData.getData('text'));
    });

    window.addEventListener('copy', (e: ClipboardEvent) => {
      // e.clipboardData.setData('text/plain', text); // TODO copy decoded value
    });

    window.addEventListener('cut', (e: ClipboardEvent) => {
      // e.clipboardData.setData('text/plain', text);
      //  TODO cut decoded value
      // clearText();
    });
  }, []);

  return { text, clearText };
};
