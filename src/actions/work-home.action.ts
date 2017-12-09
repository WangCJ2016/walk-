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
   // 添加群组
   ADDGROUP:'[work-home] addgroup',
   ADDGROUP_SUCCESS:'[work-home] addgroup_success',
   //群组人员列表
   CHATGROUPLIST: '[work-home] chatgrouplist',
   CHATGROUPLIST_SUCCESS: '[work-home] chatgrouplist_success',
   // 公告列表
   NOTICELIST: '[work-home] notice',
   NOTICELIST_SUCCESS: '[work-home] notice_success',
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
// 添加群组
export class addGroupAction implements Action {
  readonly type = ActionTypes.ADDGROUP;

  constructor(public payload: any) { }
}

export class addGroupSuccessAction implements Action {
  readonly type = ActionTypes.ADDGROUP_SUCCESS;

  constructor(public payload: any) { }
}
// 群组人员列表
export class chatGroupListAction implements Action {
  readonly type = ActionTypes.CHATGROUPLIST;

  constructor(public payload: any) { }
}

export class chatGroupListSuccessAction implements Action {
  readonly type = ActionTypes.CHATGROUPLIST_SUCCESS;

  constructor(public payload: any) { }
}
// 公告列表
export class noticeListAction implements Action {
  readonly type = ActionTypes.NOTICELIST;

  constructor(public payload: any) { }
}

export class noticeListSuccessAction implements Action {
  readonly type = ActionTypes.NOTICELIST_SUCCESS;

  constructor(public payload: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
