import { useEffect, useState } from 'react';
import extension from 'extensionizer';

import { SUPPORTED_PROTOCOLS } from '../constants/supportedProtocols';

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
        const [currentTab] = res;

        const [currentTabProtocol] = currentTab.url.split('://');

        if (SUPPORTED_PROTOCOLS.includes(currentTabProtocol)) {
          setUrl(currentTab.url);

          setUnsupportedProtocol('');
        } else {
          setUnsupportedProtocol(currentTabProtocol);
        }
      }
    );
  }, []);

  return { url, unsupportedProtocol };
};
