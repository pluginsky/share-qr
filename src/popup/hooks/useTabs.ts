import { useState, useEffect } from 'react';
import extension from 'extensionizer';

import { Tab } from '../../shared/enums/Tab';
import { StoreKey } from '../../shared/enums/StoreKey';

export const useTabs = (dafaultTab: string) => {
  const [tab, setTab] = useState(dafaultTab);

  useEffect(() => {
    extension.storage.local.get(
      StoreKey.CurrentTab,
      (res: { [StoreKey.CurrentTab]: string }) => {
        setTab(res.currentTab ?? Tab.Url);
      }
    );
  }, []);

  useEffect(() => {
    extension.storage.local.set({ [StoreKey.CurrentTab]: tab });
  }, [tab]);

  return { tab, setTab };
};
