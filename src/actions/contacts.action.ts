import { Action } from '@ngrx/store';
import { type } from '../utils';
import { empDetail } from '../domain'
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export const ActionTypes = {
  LOAD: type('[contact] load'),
  LOAD_SUCCESS: type('[contact] load_success'),
  EMPDETAIL: type('[contact] empdetail'),
  EMPDETAIL_SUCCESS: type('[contact] empdetail_success'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
// 获取员工列表
export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: any) { }
}
export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: any) { }
}
// 获取员工详情
export class EmpDetailAction implements Action {
  type = ActionTypes.EMPDETAIL;

  constructor(public payload: {empId: string}) { }
}
export class EmpDetailSuccessAction implements Action {
  type = ActionTypes.EMPDETAIL_SUCCESS;

  constructor(public payload: empDetail) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
