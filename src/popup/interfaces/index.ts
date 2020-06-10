import { INIT, SET_TAB, CLEAR_TEXT, SET_TEXT } from '../store/actions';

import { StoreKey } from '../../shared/enums/StoreKey';
import { Tab } from '../../shared/enums/Tab';

export interface PopupState {
  [StoreKey.SelectedText]: string;
  [StoreKey.CurrentTab]: Tab;
}

export interface InitAction {
  readonly type: typeof INIT;
  readonly payload: PopupState;
}

export interface SetTabAction {
  readonly type: typeof SET_TAB;
  readonly payload: Tab;
}

export interface ClearTextAction {
  readonly type: typeof CLEAR_TEXT;
}

export interface SetTextAction {
  readonly type: typeof SET_TEXT;
  readonly payload: string;
}
