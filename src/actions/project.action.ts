import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes = {
  ERROR:'[daily] error',
  ERROR_SUCCESS: '[daily] error_success',
  PRODETAIL: type('[daily] prodetail'),
  PRODETAIL_SCUCCESS : type('[daily] prodetail_success'),
  PROPEO: type('[daily] propeo'),// 项目动态、阶段人员统计
  PROPEO_SCUCCESS: type('[daily] propeo_success'),
  PROTHINGLIST:  type('[daily] prothinglist'),
  PROTHINGLIST_SCUCCESS: type('[daily] prothinglist_success'),
  PROMEMBERS: type('[daily] promembers'),
  PROMEMBERS_SCUCCESS: type('[daily] promembers_success'),
  CURRPROTREEMENU:type('[daily] currProjectTreeMenu'),
  CURRPROTREEMENU_SCUCCESS:type('[daily] currProjectTreeMenu_success'),
};
export class ErrorAction implements Action {
  readonly type = ActionTypes.ERROR;

  constructor(public payload: any) { }
}
export class ErrorSuccessAction implements Action {
  readonly type = ActionTypes.ERROR_SUCCESS;

  constructor(public payload: any) { }
}
export class proDetailAction implements Action {
  readonly type = ActionTypes.PRODETAIL;
  constructor(public payload: any) { }
}

export class proDetailSuccessAction implements Action {
  readonly type = ActionTypes.PRODETAIL_SCUCCESS;

  constructor(public payload: any) { }
}
// 项目动态、阶段人员统计
export class propeoAction implements Action {
  readonly type = ActionTypes.PROPEO;
  constructor(public payload: any) { }
}

export class propeoActionSuccessAction implements Action {
  readonly type = ActionTypes.PROPEO_SCUCCESS;

  constructor(public payload: any) { }
}

// 项目下事务
export class proThingListAction implements Action {
  readonly type = ActionTypes.PROTHINGLIST;
  constructor(public payload: any) { }
}

export class proThingListSuccessAction implements Action {
  readonly type = ActionTypes.PROTHINGLIST_SCUCCESS;

  constructor(public payload: any) { }
}
// 项目成员
export class proMembersAction implements Action {
  readonly type = ActionTypes.PROMEMBERS;
  constructor(public payload: any) { }
}

export class proMembersListSuccessAction implements Action {
  readonly type = ActionTypes.PROMEMBERS_SCUCCESS;

  constructor(public payload: any) { }
}

export class currProjectTreeMenuAction implements Action {
  readonly type = ActionTypes.CURRPROTREEMENU;
  constructor(public payload: any) { }
}

export class currProjectTreeMenuSuccessAction implements Action {
  readonly type = ActionTypes.CURRPROTREEMENU_SCUCCESS;

  constructor(public payload: any) { }
}