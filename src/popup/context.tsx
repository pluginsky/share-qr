import React, { useState } from 'react';

import { useTabs } from './hooks/useTabs';

export const StateContext = React.createContext<{
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}>({
  error: '',
  setError: () => null,
  tab: '',
  setTab: () => null,
});

export const StateProvider: React.FC = ({ children }) => {
  const [error, setError] = useState('');

  const { tab, setTab } = useTabs('url');

  return (
    <StateContext.Provider value={{ error, setError, tab, setTab }}>
      {children}
    </StateContext.Provider>
  );
};
