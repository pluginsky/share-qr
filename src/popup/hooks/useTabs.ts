import { useContext } from 'react';

import { StateContext } from '../context';

import { SET_ACTIVE_TAB } from '../store/actions';

import { StoreKey } from '../../shared/enums/StoreKey';
import { Tab } from '../../shared/enums/Tab';

export const useTabs = () => {
  const [{ [StoreKey.CurrentTab]: activeTab }, dispatch] = useContext(
    StateContext
  );

  const setActiveTab = (id: Tab) => {
    dispatch({ type: SET_ACTIVE_TAB, payload: id });
  };

  return { activeTab, setActiveTab };
};
