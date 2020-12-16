import {
  InitAction,
  SetTabAction,
  SetTextAction,
  ClearTextAction,
} from '../interfaces';

export type ActionTypes =
  | InitAction
  | SetTabAction
  | SetTextAction
  | ClearTextAction;
