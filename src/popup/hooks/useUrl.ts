import { useEffect, useState } from 'react';
import extension from 'extensionizer';

import { supportedProtocols } from '../constants/supportedProtocols';

export const useUrl = () => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    extension.tabs.query({ currentWindow: true, active: true }, (res: any) => {
      const currentPageProtocol = res[0].url.split(':')[0];

      if (supportedProtocols.includes(currentPageProtocol)) {
        setUrl(res[0].url);
      }
    });
  }, []);

  return { url };
};
