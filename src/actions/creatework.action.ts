import { Action } from '@ngrx/store';
import type from '../utils/type.util'
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes = {
  // plan_y
  PLANZSUBMIT : '[creatwork] planzsubmit',
  PLANZSUBMIT_SUCCESS : '[creatwork] planzsubmit_success',
  GETWORKDETAIL:'[creatwork] getzdetail',
  GETWORKDETAIL_SUCCESS:'[creatwork] getzdetail_success',
  UPDATE:'[creatwork] zupdate',
  UPDATE_SUCCESS:'[creatwork] zupdate_success',
  // plan_y
  PLANYSUBMIT: '[creatwork] planysubmit',
  PLANYSUBMIT_SUCCESS: '[creatwork] planysubmit_success',
  GETYDETAIL:'[creatwork] getydetail',
  GETYDETAIL_SUCCESS:'[creatwork] getydetail_success',
  UPDATEY:'[creatwork] yupdate',
  UPDATEY_SUCCESS:'[creatwork] yupdate_success',
  // meeting
  ADDMEETING:'[creatwork] addmeeting',
  ADDMEETING_SUCCESS:'[creatwork] addmeeting_success',
  MEETINGDETAIL:'[creatwork] meetingdetail',
  MEETINGDETAIL_SUCCESS:'[creatwork] meetingdetail_success',
  UPDATEMEETING:'[creatwork] updatemeeting',
  UPDATEMEETING_SUCCESS:'[creatwork] updatemeeting_success',
  // shenpi
  ADDAPPLY:'[creatwork] addapply',
  ADDAPPLY_SUCCESS:'[creatwork] addapply_success',
  APPLYDETAIL:'[creatwork] applydetail',
  APPLYDETAIL_SUCCESS:'[creatwork] applydetail_success',
  UPDATEAPPLY:'[creatwork] updateapply',
  UPDATEAPPLY_SUCCESS:'[creatwork] updateapply_success',
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
// 周计划
export class planzsubmitAction implements Action {
  readonly type = ActionTypes.PLANZSUBMIT;

  constructor(public payload: any) { }
}

export class planzsubmitSuccessAction implements Action {
  readonly type = ActionTypes.PLANZSUBMIT_SUCCESS;

  constructor(public payload: {}) { }
}
// 获得周计划详情
export class getWorkDetailAction implements Action {
  readonly type = ActionTypes.GETWORKDETAIL;

  constructor(public payload: {[key:string]:string}) { }
}

export class getWorkDetailSuccessAction implements Action {
  readonly type = ActionTypes.GETWORKDETAIL_SUCCESS;

  constructor(public payload: {}) { }
}
// 修改周计划
export class updateAction implements Action {
  readonly type = ActionTypes.UPDATE;

  constructor(public payload: any) { }
}

export class updateSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: {}) { }
}
// 月计划
export class planysubmitAction implements Action {
  readonly type = ActionTypes.PLANYSUBMIT;

  constructor(public payload: any) { }
}

export class planysubmitSuccessAction implements Action {
  readonly type = ActionTypes.PLANYSUBMIT_SUCCESS;

  constructor(public payload: {}) { }
}
// 获得月计划详情
export class getPlanYDetailAction implements Action {
  readonly type = ActionTypes.GETYDETAIL;

  constructor(public payload: {[key:string]:string}) { }
}

export class getPlanYDetailSuccessAction implements Action {
  readonly type = ActionTypes.GETYDETAIL_SUCCESS;

  constructor(public payload: {}) { }
}
// 修改月计划
export class updateYAction implements Action {
  readonly type = ActionTypes.UPDATEY;

  constructor(public payload: any) { }
}

export class updateYSuccessAction implements Action {
  readonly type = ActionTypes.UPDATEY_SUCCESS;

  constructor(public payload: {}) { }
}

// 创建meeting
export class addMeetingAction implements Action {
  readonly type = ActionTypes.ADDMEETING;

  constructor(public payload: any) { }
}

export class addMeetingSuccessAction implements Action {
  readonly type = ActionTypes.ADDMEETING_SUCCESS;

  constructor(public payload: {}) { }
}
// 获取meeting
export class meetingDetailAction implements Action {
  readonly type = ActionTypes.MEETINGDETAIL;

  constructor(public payload: any) { }
}

export class meetingDetailSuccessAction implements Action {
  readonly type = ActionTypes.MEETINGDETAIL_SUCCESS;

  constructor(public payload: {}) { }
}
// 修改meeting
export class meetingUpdateAction implements Action {
  readonly type = ActionTypes.UPDATEMEETING;

  constructor(public payload: any) { }
}

export class meetingUpdateSuccessAction implements Action {
  readonly type = ActionTypes.UPDATEMEETING_SUCCESS;

  constructor(public payload: {}) { }
}
// 创建apply
export class addapplyAction implements Action {
  readonly type = ActionTypes.ADDAPPLY;

  constructor(public payload: any) { }
}

export class addapplySuccessAction implements Action {
  readonly type = ActionTypes.ADDAPPLY_SUCCESS;

  constructor(public payload: {}) { }
}
// 获取apply
export class applyDetailAction implements Action {
  readonly type = ActionTypes.APPLYDETAIL;

  constructor(public payload: any) { }
}

export class applygDetailSuccessAction implements Action {
  readonly type = ActionTypes.APPLYDETAIL_SUCCESS;

  constructor(public payload: {}) { }
}
// 修改apply
export class applyUpdateAction implements Action {
  readonly type = ActionTypes.UPDATEAPPLY;

  constructor(public payload: any) { }
}

export class applyUpdateSuccessAction implements Action {
  readonly type = ActionTypes.UPDATEAPPLY_SUCCESS;

  constructor(public payload: {}) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */