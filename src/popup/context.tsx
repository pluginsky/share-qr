import React, { useState } from 'react';

import { useTabs } from './hooks/useTabs';

export const PopupContext = React.createContext(null);

export const StateProvider = ({ children }) => {
  const [error, setError] = useState('');

  const [tab, setTab] = useTabs('url');

  return (
    <PopupContext.Provider value={{ error, setError, tab, setTab }}>
      {children}
    </PopupContext.Provider>
  );
};
