import { StoreKey } from '../../../shared/enums/StoreKey';
import { Tab } from '../../../shared/enums/Tab';

import { INIT, SET_TAB, CLEAR_TEXT, SET_TEXT } from '../actions';

import { PopupState } from '../../context';

interface InitAction {
  readonly type: typeof INIT;
  readonly payload: PopupState;
}

interface SetTabAction {
  readonly type: typeof SET_TAB;
  readonly payload: Tab;
}

interface ClearTextAction {
  readonly type: typeof CLEAR_TEXT;
}

interface SetTextAction {
  readonly type: typeof SET_TEXT;
  readonly payload: string;
}

type ActionTypes = InitAction | SetTabAction | ClearTextAction | SetTextAction;

export const stateReducer = (state: PopupState, action: ActionTypes) => {
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
