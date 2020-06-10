import {
  InitAction,
  SetTabAction,
  ClearTextAction,
  SetTextAction,
} from '../interfaces';

export type ActionTypes =
  | InitAction
  | SetTabAction
  | ClearTextAction
  | SetTextAction;
