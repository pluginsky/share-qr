import { StoreKey } from '../../../shared/enums/StoreKey';

import { INIT, SET_TAB, CLEAR_TEXT, SET_TEXT } from '../actions';

export const stateReducer = (state: any, action: any) => {
  switch (action.type) {
    case INIT:
      return action.payload;

    case SET_TAB:
      return { ...state, [StoreKey.CurrentTab]: action.payload };

    case CLEAR_TEXT:
      return { ...state, [StoreKey.SelectedText]: '' };

    case SET_TEXT:
      return { ...state, [StoreKey.SelectedText]: action.payload };

    default:
      return state;
  }
};
