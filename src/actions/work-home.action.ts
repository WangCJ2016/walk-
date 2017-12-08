import { Action } from '@ngrx/store';
import type from '../utils/type.util'
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes = {
   // 首页列表
   LISTS : '[work-home] list',
   LISTS_SUCCESS : '[work-home] list_success',
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class ListAction implements Action {
  readonly type = ActionTypes.LISTS;

  constructor(public payload: any) { }
}

export class ListSuccessAction implements Action {
  readonly type = ActionTypes.LISTS_SUCCESS;

  constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
