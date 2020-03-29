import { useState, useEffect } from 'react';
import extension from 'extensionizer';

import { Tabs } from '../enums/Tabs';

export const useTabs = (dafaultTab: string) => {
  const [tab, setTab] = useState(dafaultTab);

  useEffect(() => {
    extension.storage.local.get('currentTab', (res: { currentTab: string }) => {
      setTab(res.currentTab ?? Tabs.Url);
    });
  }, []);

  useEffect(() => {
    extension.storage.local.set({ currentTab: tab });
  }, [tab]);

  return { tab, setTab };
};
