import {
  InitAction,
  SetActiveTabAction,
  SetTextAction,
  ClearTextAction,
} from '../interfaces';

export type ActionTypes =
  | InitAction
  | SetActiveTabAction
  | SetTextAction
  | ClearTextAction;
