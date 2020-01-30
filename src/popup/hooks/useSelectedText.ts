import { useState, useEffect, useContext } from 'react';
import extension from 'extensionizer';

import { PopupContext } from '../context';

export const useSelectedText = () => {
  const [text, setText] = useState('');

  const { setError, tab } = useContext(PopupContext);

  useEffect(() => {
    if (tab === 'text') {
      extension.storage.local.get('selectedText', (res: any) => {
        if (res.selectedText) {
          setText(res.selectedText);
          setError('');
        } else {
          setError('Add selected text first');
        }
      });
    }
  }, [tab]);

  const clearText = () => {
    extension.storage.local.set({ selectedText: null });

    setText('');
    setError('Add selected text first');
  };

  return { text, clearText };
};
