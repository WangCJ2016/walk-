import * as actions from '../actions/team.action';
import { team } from '../domain'

export interface State {
        teams: Array<team>,
        msg: string
        defaultTeam?: team
};

export const initialState: State = {
      teams: [],
      msg:''
};

export function reducer(state = initialState, action: any ): State {
    switch (action.type) {
        case actions.ActionTypes.LOAD_SUCCESS:
           return {...state,teams:action.payload}
        case actions.ActionTypes.TEAMFAIL: {
            return {...state, ...action.payload}
        }
        case actions.ActionTypes.SETDEFAULT_SUCCESS: {
            return {...state, defaultTeam:action.payload}
        }
        default: {
            return state;
        }
    }
}