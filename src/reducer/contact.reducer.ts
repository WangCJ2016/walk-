
import { contact, empDetail } from '../domain'
import * as actions from '../actions/contacts.action'

export interface State {
         contacts: Array<contact>
         empDetail: empDetail
};

export const initialState: State = {
          contacts: [],
          empDetail:{}
};

export function reducer(state = initialState, action: any ): State {
    switch (action.type) {
        case actions.ActionTypes.LOAD_SUCCESS: {
            return {...state, contacts: action.payload}
        }
        case actions.ActionTypes.EMPDETAIL_SUCCESS: {
            return {...state, empDetail: action.payload}
        }
        default: {
            return state;
        }
    }
}