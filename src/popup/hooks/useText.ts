import { useState, useEffect, useContext } from 'react';
import extension from 'extensionizer';

import { StateContext } from '../context';

export const useText = () => {
  const [text, setText] = useState('');

  const { tab, setError } = useContext(StateContext);

  useEffect(() => {
    if (tab === 'text') {
      extension.storage.local.get('selectedText', (res: any) => {
        if (res.selectedText) {
          setText(res.selectedText);
        } else {
          setError('First select the text to be encoded');
        }
      });
    }
  }, [tab]);

  return { text };
};
