import React, { useState } from 'react';

import { useTabs } from './hooks/useTabs';

import { Children } from './types/Children';

interface Props {
  children: Children;
}

export const StateContext = React.createContext<{
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string>>;
  tab?: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}>(null);

export const StateProvider = ({ children }: Props) => {
  const [error, setError] = useState('');

  const { tab, setTab } = useTabs('url');

  return (
    <StateContext.Provider value={{ error, setError, tab, setTab }}>
      {children}
    </StateContext.Provider>
  );
};
