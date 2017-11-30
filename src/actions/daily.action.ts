import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes = {
  ADDDAILY: type('[daily] adddaily'),
  ADDDAILY_SCUCCESS : type('[daily] adddaily_success'),
  DAILYSTAT:type('[daily] dailystat'),
  DAILYSTAT_SUCCESS:type('[daily] dailystat_success'),
  DETAILDAILY: type('[daily] detaildaily'),
  DETAILDAILY_SCUCCESS: type('[daily] detaildaily_success'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */

 // 添加日报
export class AddDailyAction implements Action {
  readonly type = ActionTypes.ADDDAILY;

  constructor(public payload: {content: string}) { }
}

export class AddDailySuccessAction implements Action {
  readonly type = ActionTypes.ADDDAILY_SCUCCESS;

  constructor(public payload: any) { }
}
// 日报统计上交情况
export class DailyStatAction implements Action {
  readonly type = ActionTypes.DAILYSTAT;

  constructor(public payload: {submitDate: string}) { }
}

export class DailyStatSuccessAction implements Action {
  readonly type = ActionTypes.DAILYSTAT_SUCCESS;

  constructor(public payload: any) { }
}
// 查看成员日报
export class DailyDetailAction implements Action {
  readonly type = ActionTypes.DETAILDAILY;

  constructor(public payload: {empId1: string,submitDate:string}) { }
}

export class DailyDetailSuccessAction implements Action {
  readonly type = ActionTypes.DETAILDAILY_SCUCCESS;

  constructor(public payload: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */