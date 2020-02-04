import { useState, useEffect, useContext } from 'react';
import extension from 'extensionizer';

import { PopupContext } from '../context';

export const useText = () => {
  const [text, setText] = useState('');

  const { tab } = useContext(PopupContext);

  useEffect(() => {
    if (tab === 'text') {
      extension.storage.local.get('selectedText', (res: any) => {
        if (res.selectedText) setText(res.selectedText);
      });
    }
  }, [tab]);

  const clearText = () => {
    extension.storage.local.set({ selectedText: null });

    setText('');
  };

  const editText = (newValue: string) => {
    extension.storage.local.set({ selectedText: newValue });

    setText(newValue);
  };

  return { text, editText, clearText };
};
