import { INIT, SET_ACTIVE_TAB, CLEAR_TEXT, SET_TEXT } from '../store/actions';

import { StoreKey } from '../../shared/constants/StoreKey';
import { Tab } from '../../shared/constants/Tab';

export interface PopupState {
  [StoreKey.SelectedText]: string;
  [StoreKey.CurrentTab]: Tab;
}

interface InitAction {
  readonly type: typeof INIT;
  readonly payload: PopupState;
}

interface SetActiveTabAction {
  readonly type: typeof SET_ACTIVE_TAB;
  readonly payload: Tab;
}

interface SetTextAction {
  readonly type: typeof SET_TEXT;
  readonly payload: string;
}

interface ClearTextAction {
  readonly type: typeof CLEAR_TEXT;
}

export type ActionTypes =
  | InitAction
  | SetActiveTabAction
  | SetTextAction
  | ClearTextAction;
