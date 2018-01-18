import { Action } from '@ngrx/store';
import {type} from '../utils/type.util';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes = {
  ERROR:'[Chat] error',
  ERROR_SUCCESS: '[Chat] error_success',
  CHATLIST:type('[Chat] chatlist'),
  CHATLIST_SUCCESS:type('[Chat] chatlist_success'),
  CHATLISTINITIAL:type('[Chat] chatlistInitail'),
  SENDCHAT:type('[Chat] sendchat'),
  SENDCHAT_SUCCESS:type('[Chat] sendchat_success'),
   // 添加群组
   ADDGROUP:'[Chat] addgroup',
   ADDGROUP_SUCCESS:'[Chat] addgroup_success',
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */

export class ErrorAction implements Action {
  readonly type = ActionTypes.ERROR;

  constructor(public payload: any) { }
}
export class ErrorSuccessAction implements Action {
  readonly type = ActionTypes.ERROR_SUCCESS;

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
export class ChatListAction implements Action {
  readonly type = ActionTypes.CHATLIST;

  constructor(public payload: any) { }
}

export class ChatListSuccessAction implements Action {
  readonly type = ActionTypes.CHATLIST_SUCCESS;

  constructor(public payload: any) { }
}
export class ChatListInitalAction implements Action {
  readonly type = ActionTypes.CHATLISTINITIAL;

  constructor(public payload: any) { }
}
export class sendChatAction implements Action {
  readonly type = ActionTypes.SENDCHAT;

  constructor(public payload: any) { }
}

export class sendChatSuccessAction implements Action {
  readonly type = ActionTypes.SENDCHAT_SUCCESS;

  constructor(public payload: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
;
