import { useContext } from 'react';

import { StateContext } from '../context';

import { SET_TAB } from '../store/actions';

import { StoreKey } from '../../shared/enums/StoreKey';
import { Tab } from '../../shared/enums/Tab';

export const useTabs = () => {
  const [{ [StoreKey.CurrentTab]: tab }, dispatch] = useContext(StateContext);

  const setTab = (id: Tab) => {
    dispatch({ type: SET_TAB, payload: id });
  };

  return { tab, setTab };
};
