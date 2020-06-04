import { useContext } from 'react';

import { StateContext } from '../context';

import { SET_TAB } from '../store/actions';

import { Tab } from '../../shared/enums/Tab';

export const useTabs = () => {
  const [{ currentTab: tab }, dispatch] = useContext(StateContext);

  const setTab = (id: Tab) => {
    dispatch({ type: SET_TAB, payload: id });
  };

  return { tab, setTab };
};
