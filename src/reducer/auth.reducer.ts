import * as authAction from '../actions/auth.action';
import { Auth } from '../domain'
export interface State {
         auth:Auth
};

export const initialState: State = {
        auth: {
            name: '张三',
            image: 'assets/imgs/work-usercenter/head.png',
            account: '1234456677',
            sex: 'male',
            address: '浙江省-杭州市-西湖区'
        }
};

export function reducer(state = initialState, action: any ): State {
    switch (action.type) {
        case authAction.ActionTypes.LOGIN_SUCCESS: {
            return {...state, auth: action.payload}
        }
        case authAction.ActionTypes.CHANGE_SUCCESS: {
            const auth = {...state.auth,...action.payload}
            return {...state, auth}
        }
        default: {
            return state;
        }
    }
}