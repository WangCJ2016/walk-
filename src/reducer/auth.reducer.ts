import * as authAction from '../actions/auth.action';
import { Auth } from '../domain'
export interface State {
         auth:Auth
};

export const initialState: State = {
        auth: {}
};

export function reducer(state = initialState, action: authAction.Actions ): State {
    switch (action.type) {
        case authAction.ActionTypes.LOGIN_SUCCESS: {
            console.log(333)
            return {...state, auth: action.payload}
        }

        default: {
            return state;
        }
    }
}