import React, { useState } from 'react';

import { useTabs } from './hooks/useTabs';

export const StateContext = React.createContext(null);

export const StateProvider = ({ children }) => {
  const [error, setError] = useState('');

  const [tab, setTab] = useTabs('url');

  return (
    <StateContext.Provider value={{ error, setError, tab, setTab }}>
      {children}
    </StateContext.Provider>
  );
};
