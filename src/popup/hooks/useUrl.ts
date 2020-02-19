import { useState, useEffect, useContext } from 'react';
import extension from 'extensionizer';

import { supportedProtocols } from '../constants/supportedProtocols';

import { PopupContext } from '../context';

export const useUrl = () => {
  const [url, setUrl] = useState('');

  const { setError, tab } = useContext(PopupContext);

  useEffect(() => {
    if (tab === 'url') {
      extension.tabs.query(
        { currentWindow: true, active: true },
        (res: any) => {
          const currentPageProtocol = res[0].url.split(':')[0];

          if (supportedProtocols.includes(currentPageProtocol)) {
            setUrl(res[0].url);

            setError('');
          } else {
            setError(
              `Protocol ${currentPageProtocol.toUpperCase()} is not supported`
            );
          }
        }
      );
    } else {
      setError('');
    }
  }, [tab]);

  return { url };
};
