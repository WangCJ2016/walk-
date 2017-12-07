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
  APPLYLIST: '[creatwork] applylist',
  APPLYLIST_SUCCESS: '[creatwork] applylist_success',
  APPLYFLOW:'[creatwork] applyflowlist',
  APPLYFLOW_SUCCESS:'[creatwork] applyflowlist_success',
  // shiwu
  ADDSHIWU:'[creatwork] addshiwu',
  ADDSHIWU_SUCCESS:'[creatwork] addshiwu_success',
  SHIWUDETAIL:'[creatwork] shiwudetail',
  SHIWUDETAIL_SUCCESS:'[creatwork] shiwudetail_success',
  SHIWUUPDATE:'[creatwork] shiwuupdate',
  SHIWUUPDATE_SUCCESS:'[creatwork] shiwuupdate_success',
  SHIWULIST:'[creatwork] shiwulist',
  SHIWULIST_SUCCESS:'[creatwork] shiwulist_success',
  // 获取子事务
  ZISHIWU:'[creatwork] zishiwu',
  ZISHIWU_SUCCESS:'[creatwork] zishiwu_success',
  SHIWUDEL:'[creatwork] delshiwu',
  SHIWUDEL_SUCCESS:'[creatwork] delzishiwu_success',
  // 成果产出物
  REQUIRELIST:'[creatwork] requirelist',
  REQUIRELIST_SUCCESS:'[creatwork] requirelist_success',
  ADDREQUIRE:'[creatwork] addrequire',
  ADDREQUIRE_SUCCESS:'[creatwork] addrequire_success',
  DELREQUIRE:'[creatwork] delrequire',
  DELREQUIRE_SUCCESS:'[creatwork] delrequire_success',
  // 获取日期
  WORKPLATE:'[creatwork] workplate',
  WORKPLATE_SUCCESS:'[creatwork] workplate_success',
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
// 成果产出物
export class requireListAction implements Action {
  readonly type = ActionTypes.REQUIRELIST;

  constructor(public payload: any) { }
}

export class requireListSuccessAction implements Action {
  readonly type = ActionTypes.REQUIRELIST_SUCCESS;

  constructor(public payload: {}) { }
}
export class addRequireAction implements Action {
  readonly type = ActionTypes.ADDREQUIRE;

  constructor(public payload: any) { }
}

export class addRequireSuccessAction implements Action {
  readonly type = ActionTypes.ADDREQUIRE_SUCCESS;

  constructor(public payload: {}) { }
}
export class delRequireAction implements Action {
  readonly type = ActionTypes.DELREQUIRE;

  constructor(public payload: any) { }
}

export class delRequireSuccessAction implements Action {
  readonly type = ActionTypes.DELREQUIRE_SUCCESS;

  constructor(public payload: {}) { }
}
// 获取日期
export class workPlateAction implements Action {
  readonly type = ActionTypes.WORKPLATE;

  constructor(public payload: any) { }
}

export class workPlateSuccessAction implements Action {
  readonly type = ActionTypes.WORKPLATE_SUCCESS;

  constructor(public payload: {}) { }
}
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
// 审批列表
export class applyListAction implements Action {
  readonly type = ActionTypes.APPLYLIST;

  constructor(public payload: {type:string,pageNo:string}) { }
}

export class applyListSuccessAction implements Action {
  readonly type = ActionTypes.APPLYLIST_SUCCESS;

  constructor(public payload: {}) { }
}
// 审批流程图
export class applyFlowAction implements Action {
  readonly type = ActionTypes.APPLYFLOW;

  constructor(public payload: {applyId:string}) { }
}

export class applyFlowSuccessAction implements Action {
  readonly type = ActionTypes.APPLYFLOW_SUCCESS;

  constructor(public payload: {}) { }
}
// 事务list
export class shiwuListAction implements Action {
  readonly type = ActionTypes.SHIWULIST;

  constructor(public payload: any) { }
}

export class shiwuListSuccessAction implements Action {
  readonly type = ActionTypes.SHIWULIST_SUCCESS;

  constructor(public payload: any) { }
}
// 添加事务
export class addShiwuAction implements Action {
  readonly type = ActionTypes.ADDSHIWU;

  constructor(public payload: any) { }
}

export class addShiwuSuccessAction implements Action {
  readonly type = ActionTypes.ADDSHIWU_SUCCESS;

  constructor(public payload: {}) { }
}
// 事务详情
export class shiwuDetailAction implements Action {
  readonly type = ActionTypes.SHIWUDETAIL;

  constructor(public payload: {thingId:string}) { }
}

export class shiwuDetailuSuccessAction implements Action {
  readonly type = ActionTypes.SHIWUDETAIL_SUCCESS;

  constructor(public payload: {}) { }
}
// 修改事务
export class shiwuUpdateAction implements Action {
  readonly type = ActionTypes.SHIWUUPDATE;

  constructor(public payload: any) { }
}

export class shiwuUpdateSuccessAction implements Action {
  readonly type = ActionTypes.SHIWUUPDATE_SUCCESS;

  constructor(public payload: {}) { }
}
// 获取子事务
export class zishiwuAction implements Action {
  readonly type = ActionTypes.ZISHIWU;

  constructor(public payload: {parentId:string,type:string}) { }
}

export class zishiwuSuccessAction implements Action {
  readonly type = ActionTypes.ZISHIWU_SUCCESS;

  constructor(public payload: {}) { }
}
 // 删除事务
 export class zishiwuDelAction implements Action {
  readonly type = ActionTypes.SHIWUDEL;

  constructor(public payload: {thingId:string}) { }
}

export class zishiwuDelSuccessAction implements Action {
  readonly type = ActionTypes.SHIWUDEL_SUCCESS;

  constructor(public payload: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */