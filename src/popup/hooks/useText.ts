import { useState, useEffect, useContext } from 'react';
import extension from 'extensionizer';

import { StateContext } from '../context';

import { Tab } from '../../shared/enums/Tab';
import { StoreKey } from '../../shared/enums/StoreKey';

export const useText = () => {
  const [text, setText] = useState('');

  const { tab, setError } = useContext(StateContext);

  // const clearText = () => {
  //   setText('');

  //   extension.storage.local.set({
  //     [StoreKey.SelectedText]: '',
  //   });

  //   setError('First select the text to be encoded');
  // };

  useEffect(() => {
    // if (tab === Tab.Text) {
    extension.storage.local.get(
      StoreKey.SelectedText,
      (res: { [StoreKey.SelectedText]: string }) => {
        if (res.selectedText) {
          setText(res.selectedText);
        } else {
          setError('First select the text to be encoded');
        }
      }
    );
    // }
  }, [tab]);

  return {
    text,
    // clearText,
  };
};
