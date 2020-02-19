import { useState, useEffect } from 'react';
import extension from 'extensionizer';

export const useTabs = (dafaultTab: string) => {
  const [tab, setTab] = useState(dafaultTab);

  useEffect(() => {
    extension.storage.local.get('currentTab', (res: any) => {
      if (res.currentTab) setTab(res.currentTab);
    });
  }, []);

  useEffect(() => {
    extension.storage.local.set({ currentTab: tab });
  }, [tab]);

  return [tab, setTab];
};
