import * as authAction from '../actions/auth.action';
import { Auth } from '../domain'
export interface State {
         auth:Auth,
         msg: string
};

export const initialState: State = {
        auth: {
            name: '',
            photo: 'assets/imgs/work-usercenter/head.png',
            sex: '1',
            sign: '',
            code: '',
            countIf: false
        },
        msg: ''
};

export function reducer(state = initialState, action: any ): State {
    switch (action.type) {
        case authAction.ActionTypes.USERINFO_SUCCESS:
        case authAction.ActionTypes.CHANGE_SUCCESS:
        case authAction.ActionTypes.SIGN_SUCCESS:
        case authAction.ActionTypes.REGISTER_VERCODE_SUCCESS:
        case authAction.ActionTypes.LOGIN_SUCCESS: {
            console.log(action.payload)
            const auth = {...state.auth,...action.payload}
            return {...state, auth, msg: ''}
        }
        case authAction.ActionTypes.FORGET_PASSWORD_SUCCESS:
        case authAction.ActionTypes.AUTH_FAIL_SUCCESS: {
            return {...state, ...action.payload}
        }
        case authAction.ActionTypes.LOGOUT_SUCCESS: {
            return {...state, ...initialState}
        }
        default: {
            return state;
        }
    }
}