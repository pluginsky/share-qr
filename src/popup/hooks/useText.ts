import { useState, useEffect, useContext } from 'react';
import { useDebounce } from 'use-debounce';
import extension from 'extensionizer';

import { PopupContext } from '../context';

export const useText = () => {
  const [text, setText] = useState('');
  const [editable, setEditable] = useState(false);
  // const [debounced] = useDebounce(text, 500);

  const { tab, setError } = useContext(PopupContext);

  useEffect(() => {
    if (tab === 'text') {
      extension.storage.local.get('selectedText', (res: any) => {
        if (res.selectedText) {
          setText(res.selectedText);
        } else {
          setError('Select text');
        }
      });
    }
  }, [tab]);

  const clearText = () => {
    extension.storage.local.set({ selectedText: null });

    setText('');
  };

  useEffect(() => {
    // extension.storage.local.set({ selectedText: debounced });
  }, []);

  const toggleEitable = () => {
    setEditable(!editable);
  };

  return {
    text,
    setText,
    // debounced,
    clearText,
    toggleEitable,
    editable
  };
};
