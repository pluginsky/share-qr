import { useCallback, useContext } from 'react';

import { StateContext } from '../context';

import { SET_ACTIVE_TAB } from '../store/actions';

import { StoreKey } from '../../shared/enums/StoreKey';
import { Tab } from '../../shared/enums/Tab';

type SetActiveTabCallback = (id: Tab) => void;

export const useTabs = () => {
  const [{ [StoreKey.CurrentTab]: activeTab }, dispatch] = useContext(
    StateContext
  );

  const setActiveTab = useCallback<SetActiveTabCallback>(
    (id) => {
      dispatch({ type: SET_ACTIVE_TAB, payload: id });
    },
    [dispatch]
  );

  return { activeTab, setActiveTab };
};
