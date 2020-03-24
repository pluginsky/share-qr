import { useState, useEffect, useContext } from 'react';
import extension from 'extensionizer';

import { StateContext } from '../context';

import { Tabs } from '../enums/Tabs';

export const useText = () => {
  const [text, setText] = useState('');

  const { tab, setError } = useContext(StateContext);

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

  return { text };
};
