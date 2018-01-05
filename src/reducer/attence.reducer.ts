import * as actions from '../actions/attence.action';
import { attence } from '../domain'
export interface State {
        attence: attence,
        endDate?: string
        dailyStatusByMonth?: Array<any>
        msg:''
};

export const initialState: State = {
    attence: {},
    msg:''
};

export function reducer(state = initialState, action: any ): State {
    switch (action.type) {
        case actions.ActionTypes.GETATTENDACE_SUCCESS:
        case actions.ActionTypes.SIGNIN_SUCCESS: {
            const attence = {...state.attence,attenceInview: action.payload}
            return {...state, attence: attence}
        }
        case actions.ActionTypes.ATTENCERECORD_SUCCESS: {
            const attence = {...state.attence,attenceRecordList: action.payload}
            return {...state, attence: attence}
        }
        case actions.ActionTypes.ATTENCESTAT_SUCCESS: {
            const attence = {...state.attence,attencePeople: action.payload}
            return {...state, attence: attence}
        }
        case actions.ActionTypes.ATTENCE_FAIL: {
            
            return {...state, ...initialState}
        }
        case actions.ActionTypes.GETENDDATE_SUCCESS: {
            return {...state, ...action.payload}
        }
        case actions.ActionTypes.ATTENCESTATUSBYMONTH_SUCCESS:{
            return {...state,dailyStatusByMonth:action.payload}
          }
        default: {
            return state;
        }
    }
}