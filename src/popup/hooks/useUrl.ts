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
    const parseUrlAndHandleMessage = (res: TabQueryResult[]) => {
      const [currentTab] = res;

      const [currentTabProtocol] = currentTab.url.split('://');

      const isSupportedProtocol = SUPPORTED_PROTOCOLS.includes(
        currentTabProtocol
      );

      if (isSupportedProtocol) {
        setUrl(currentTab.url);

        setUnsupportedProtocol('');
      } else {
        setUnsupportedProtocol(currentTabProtocol);
      }
    };

    extension.tabs.query(
      { currentWindow: true, active: true },
      parseUrlAndHandleMessage
    );
  }, []);

  return { url, unsupportedProtocol };
};
