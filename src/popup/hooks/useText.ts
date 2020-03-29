import { useState, useEffect, useContext } from 'react';
import extension from 'extensionizer';

import { StateContext } from '../context';

import { Tabs } from '../enums/Tabs';

export const useText = () => {
  const [text, setText] = useState('');

  const { tab, setError } = useContext(StateContext);

  const clearText = () => {
    setText('');

    extension.storage.local.set({
      selectedText: '',
    });

    setError('First select the text to be encoded');
  };

  useEffect(() => {
    window.addEventListener('paste', (e: any) => {
      setText(e.clipboardData.getData('text'));

      extension.storage.local.set({
        selectedText: e.clipboardData.getData('text'),
      });

      setError('');
    });

    window.addEventListener('copy', (e: any) => {
      e.clipboardData.setData('text/plain', text);
    });

    window.addEventListener('cut', (e: any) => {
      e.clipboardData.setData('text/plain', text);

      setText('');

      extension.storage.local.set({
        selectedText: '',
      });

      setError('First select the text to be encoded');
    });
  }, []);

  useEffect(() => {
    if (tab === Tabs.Text) {
      extension.storage.local.get(
        'selectedText',
        (res: { selectedText: string }) => {
          if (res.selectedText) {
            setText(res.selectedText);
          } else {
            setError('First select the text to be encoded');
          }
        }
      );
    }
  }, [tab]);

  return { text, clearText };
};
