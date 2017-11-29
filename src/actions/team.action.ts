import { Action } from '@ngrx/store';
import {type} from '../utils/type.util';
import { team, Err } from '../domain'
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes = {
  TEAMFAIL:type('[Team] fail'),
  LOAD: type('[Team] load'),
  LOAD_SUCCESS: type('[Team] load Success'),
  SETDEFAULT:type('[Team] setdafault Success'),
  SETDEFAULT_SUCCESS:type('[Team] setdefault Success'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */

export class AuthFailAction implements Action {
  type = ActionTypes.TEAMFAIL;

  constructor(public payload: Err) {
  }
}
// 获取teams
export class LoadAction implements Action {
  readonly type = ActionTypes.LOAD;

  constructor(public payload: any) {
    
   }
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Array<team>) { }
}
// 设置team
export class SetdefaultAction implements Action {
  readonly type = ActionTypes.SETDEFAULT;

  constructor(public payload: {empId: string}) {
    
   }
}

export class SetdefaultSuccessAction implements Action {
  readonly type = ActionTypes.SETDEFAULT_SUCCESS;

  constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */

