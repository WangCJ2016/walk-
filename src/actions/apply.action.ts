import { Action } from '@ngrx/store';
import {type} from '../utils/type.util'
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes = {
  APPLYLIST: type('[Class] applylist'),
  APPLYLIST_SUCCESS : type('[Class] applylist_success')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class appplylistAction implements Action {
  readonly type = ActionTypes.APPLYLIST;

  constructor(public payload: any) { }
}

export class appplylistSuccessAction implements Action {
  readonly type = ActionTypes.APPLYLIST_SUCCESS;

  constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
