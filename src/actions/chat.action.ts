import { Action } from '@ngrx/store';
import {type} from '../utils/type.util';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes = {
  CHATLIST:type('[Chat] chatlist'),
  CHATLIST_SUCCESS:type('[Chat] chatlist_success'),
  CHATLISTINITIAL:type('[Chat] chatlistInitail'),
  SENDCHAT:type('[Chat] sendchat'),
  SENDCHAT_SUCCESS:type('[Chat] sendchat_success'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
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
