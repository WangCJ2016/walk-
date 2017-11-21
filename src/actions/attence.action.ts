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
    SETDAY: type('[attence] setday'),
    SETDAY_SUCCESS: type('[attence] setday_success'),
    SETDAY_FAIL: type('[attence] setday_fail'),
    SIGNIN: type('[attence] signin'),
    SIGNIN_SUCCESS: type('[attence] signin_success'),
    SIGNIN_FAIL: type('[attence] signin_fail')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class SetDayAction implements Action {
    type = ActionTypes.SETDAY;

    constructor(public payload: { day: string}) { }
}
export class SetDaySuccessAction implements Action {
    type = ActionTypes.SETDAY_SUCCESS;

    constructor(public payload: { day: string }) { }
}
export class SetDayFailAction implements Action {
    type = ActionTypes.SETDAY_FAIL;

    constructor(public payload: any) { }
}
export class SignAction implements Action {
    type = ActionTypes.SIGNIN;

    constructor(public payload: { [key: string]:{time: string, address: string }}) { }
}
export class SignSuccessAction implements Action {
    type = ActionTypes.SIGNIN_SUCCESS;

    constructor(public payload: { [key: string]:{time: string, address: string }}) { }
}
export class SignFailAction implements Action {
    type = ActionTypes.SIGNIN_FAIL;

    constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
