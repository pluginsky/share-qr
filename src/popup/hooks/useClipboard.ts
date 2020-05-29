import { useState, useEffect } from 'react';
import extension from 'extensionizer';

import { StoreKey } from '../../shared/enums/StoreKey';

export const useClipboard = (value: any) => {
  const [clipboard, setClipboard] = useState<any>();
  const [text, setText] = useState(value);

  useEffect(() => {
    extension.storage.local.get(StoreKey.Clipboard, (res: any) => {
      setClipboard(res);
    });
  }, []);

  useEffect(() => {
    if (clipboard.copy) {
      window.addEventListener('copy', (e: ClipboardEvent) => {
        e.clipboardData.setData('text/plain', text);
      });
    } else {
      window.removeEventListener('copy', null);
    }

    return () => window.removeEventListener('copy', null);
  }, [clipboard]);

  useEffect(() => {
    if (clipboard.paste) {
      window.addEventListener('paste', (e: ClipboardEvent) => {
        setText(e.clipboardData.getData('text'));

        extension.storage.local.set({
          [StoreKey.SelectedText]: e.clipboardData.getData('text'),
        });
      });
    } else {
      window.removeEventListener('paste', null);
    }

    return () => window.removeEventListener('paste', null);
  }, [clipboard]);

  useEffect(() => {
    if (clipboard.cut) {
      window.addEventListener('cut', (e: ClipboardEvent) => {
        e.clipboardData.setData('text/plain', text);

        setText('');

        extension.storage.local.set({
          [StoreKey.SelectedText]: '',
        });
      });
    } else {
      window.removeEventListener('cut', null);
    }

    return () => window.removeEventListener('cut', null);
  }, [clipboard]);

  return { clipboard, text };
};
