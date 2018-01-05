import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export const ActionTypes = {
    ATTENCE_FAIL: type('[attence] attence_fail'),
    GETATTENDACE: type('[attence] getattendance'),
    GETATTENDACE_SUCCESS: type('[attence] getattendance_success'),
    SIGNIN: type('[attence] signin'),
    SIGNIN_SUCCESS: type('[attence] signin_success'),
    ATTENCERECORD: type('[attence] attencerecord'),
    ATTENCERECORD_SUCCESS: type('[attence] attencerecord_success'),
    ATTENCESTAT: type('[attence] attencestat'),
    ATTENCESTAT_SUCCESS: type('[attence] attencestat_success'),
    SETATTENCE:type('[attence] setattence'),
    SETATTENCE_SUCCESS:type('[attence] setattence_success'),
    GETENDDATE:type('[attence] getendate'),
    GETENDDATE_SUCCESS:type('[attence] getendate_success'),
    ATTENCESTATUSBYMONTH: type('[attence] attenstatusbymonth'),
    ATTENCESTATUSBYMONTH_SUCCESS: type('[attence] attenstatusbymonth_success'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */

export class FailAction implements Action {
    type = ActionTypes.ATTENCE_FAIL;

    constructor(public payload: any) { }
}
// 显示签到或签退
export class GetAttendacnceAction implements Action {
    type = ActionTypes.GETATTENDACE;

    constructor(public payload: any) { }
}
export class GetAttendacnceSuccessAction implements Action {
    type = ActionTypes.GETATTENDACE_SUCCESS;

    constructor(public payload: { day: string }) { }
}
// 打卡
export class SignAction implements Action {
    type = ActionTypes.SIGNIN;

    constructor(public payload: {type: string, lng:string, lat:string, trueAddress:string,pictures?:string}) { }
}
export class SignSuccessAction implements Action {
    type = ActionTypes.SIGNIN_SUCCESS;

    constructor(public payload: any) { }
}
// 获取考勤列表
export class AttenceRecordAction implements Action {
    type = ActionTypes.ATTENCERECORD;

    constructor(public payload: {time: string,empId?:any}) { }
}
export class AttenceRecordSuccessAction implements Action {
    type = ActionTypes.ATTENCERECORD_SUCCESS;

    constructor(public payload: any) { }
}
// 考勤统计在岗情况
export class AttenceStatAction implements Action {
    type = ActionTypes.ATTENCESTAT;

    constructor(public payload: {time: string}) { }
}
export class AttenceStatSuccessAction implements Action {
    type = ActionTypes.ATTENCESTAT_SUCCESS;

    constructor(public payload: any) { }
}
// 设置员工考勤状态
export class setAttenceAction implements Action {
    type = ActionTypes.SETATTENCE;

    constructor(public payload: any) { }
}
export class setAttenceSuccessAction implements Action {
    type = ActionTypes.SETATTENCE_SUCCESS;

    constructor(public payload: any) { }
}
// 考勤设置时获取截止
export class getEndDateAction implements Action {
    type = ActionTypes.GETENDDATE;

    constructor(public payload: any) { }
}
export class getEndDateSuccessAction implements Action {
    type = ActionTypes.GETENDDATE_SUCCESS;

    constructor(public payload: any) { }
}
// 月统计考勤状态
export class statusByMonthAction implements Action {
    type = ActionTypes.ATTENCESTATUSBYMONTH;

    constructor(public payload: any) { }
}
export class statusByMontSuccessAction implements Action {
    type = ActionTypes.ATTENCESTATUSBYMONTH_SUCCESS;

    constructor(public payload: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
