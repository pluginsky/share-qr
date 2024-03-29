import { StoreKey } from '../../../shared/constants/StoreKey';

import { INIT, SET_ACTIVE_TAB, SET_TEXT, CLEAR_TEXT } from '../actions';

import type { PopupState, ActionTypes } from '../../types';

export const stateReducer = (state: PopupState, action: ActionTypes) => {
  switch (action.type) {
    case INIT:
      return action.payload;

    // TODO move to separate reducer
    case SET_ACTIVE_TAB:
      return { ...state, [StoreKey.CurrentTab]: action.payload };

    case SET_TEXT:
      return { ...state, [StoreKey.SelectedText]: action.payload };

    case CLEAR_TEXT:
      return { ...state, [StoreKey.SelectedText]: '' };

    default:
      return state;
  }
};
