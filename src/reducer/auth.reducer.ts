import * as authAction from '../actions/auth.action';
import { Auth } from '../domain'
export interface State {
         auth:Auth,
         msg: string
};

export const initialState: State = {
        auth: {
            name: '张三',
            phoneNum: '',
            image: 'assets/imgs/work-usercenter/head.png',
            account: '1234456677',
            sex: 'male',
            address: '浙江省-杭州市-西湖区',
            sign: '',
            code: ''
        },
        msg: ''
};

export function reducer(state = initialState, action: any ): State {
    switch (action.type) {
        case authAction.ActionTypes.CHANGE_SUCCESS:
        case authAction.ActionTypes.SIGN_SUCCESS:
        case authAction.ActionTypes.REGISTER_VERCODE_SUCCESS:
        case authAction.ActionTypes.LOGIN_SUCCESS: {
            console.log(action)
            const auth = {...state.auth,...action.payload}
            return {...state, auth, msg: ''}
        }
        case authAction.ActionTypes.FORGET_PASSWORD_SUCCESS:
        case authAction.ActionTypes.AUTH_FAIL: {
            return {...state, ...action.payload}
        }
        default: {
            return state;
        }
    }
}