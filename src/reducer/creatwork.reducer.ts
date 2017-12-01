import * as actions from '../actions/creatework.action'
import { createObj} from '../domain'
export interface State {
     workdetail?: createObj
};

export const initialState: State = {
    
};

export function reducer(state = initialState, action: any ): State {
  switch (action.type) {
    case actions.ActionTypes.GETWORKDETAIL_SUCCESS: {
      return {...state,workdetail:action.payload}
    }

    default: {
      return state;
    }
  }
}