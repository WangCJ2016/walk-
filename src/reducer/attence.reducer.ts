import * as actions from '../actions/attence.action';

export interface State {
        attence: {
            day: string,
            signin: {
                time: string,
                address: string
            },
            signup: {
                time: string,
                address: string
            }
        } 
};

export const initialState: State = {
    attence: {
        day:  '1990-1-1',
        signin: {
            time: '',
            address: ''
        },
        signup: {
            time: '',
            address: ''
        }
    }
};

export function reducer(state = initialState, action: any ): State {
    switch (action.type) {
        case actions.ActionTypes.SETDAY_SUCCESS: {
            const attence = {...state.attence, day: action.payload.day}
            return {...state, attence}
        }
        case actions.ActionTypes.SIGNIN_SUCCESS: {
            const attence = {...state.attence, ...action.payload}
            return {...state, attence}
        }
        default: {
            return state;
        }
    }
}