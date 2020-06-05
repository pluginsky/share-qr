import { useEffect, useState } from 'react';
import extension from 'extensionizer';

import { supportedProtocols } from '../constants/supportedProtocols';

interface TabQueryResult {
  readonly url: string;
}

export const useUrl = () => {
  const [url, setUrl] = useState('');

  const [unsupportedProtocol, setUnsupportedProtocol] = useState('');

  useEffect(() => {
    extension.tabs.query(
      { currentWindow: true, active: true },
      (res: TabQueryResult[]) => {
        const currentPageProtocol = res[0].url.split(':')[0];

        if (supportedProtocols.includes(currentPageProtocol)) {
          setUrl(res[0].url);

          setUnsupportedProtocol('');
        } else {
          setUnsupportedProtocol(currentPageProtocol);
        }
      }
    );
  }, []);

  return { url, unsupportedProtocol };
};
