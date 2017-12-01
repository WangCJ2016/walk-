import { Action } from '@ngrx/store';
import type from '../utils/type.util'
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes = {
  PLANZSUBMIT : '[creatwork] planzsubmit',
  PLANZSUBMIT_SUCCESS : '[creatwork] planzsubmit_success',
  GETWORKDETAIL:'[creatwork] getdetail',
  GETWORKDETAIL_SUCCESS:'[creatwork] getdetail_success',
  UPDATE:'[creatwork] update',
  UPDATE_SUCCESS:'[creatwork] update_success',
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
// 周计划
export class planzsubmitAction implements Action {
  readonly type = ActionTypes.PLANZSUBMIT;

  constructor(public payload: {}) { }
}

export class planzsubmitSuccessAction implements Action {
  readonly type = ActionTypes.PLANZSUBMIT_SUCCESS;

  constructor(public payload: {}) { }
}
// 获得计划详情
export class getWorkDetailAction implements Action {
  readonly type = ActionTypes.GETWORKDETAIL;

  constructor(public payload: {[key:string]:string}) { }
}

export class getWorkDetailSuccessAction implements Action {
  readonly type = ActionTypes.GETWORKDETAIL_SUCCESS;

  constructor(public payload: {}) { }
}
// 修改计划
export class updateAction implements Action {
  readonly type = ActionTypes.UPDATE;

  constructor(public payload: any) { }
}

export class updateSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: {}) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */