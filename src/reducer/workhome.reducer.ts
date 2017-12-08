import * as actions from '../actions/work-home.action';

export interface State {
     
};

export const initialState: State = {
    
};

export function reducer(state = initialState, action: any ): State {
  switch (action.type) {
    case actions.ActionTypes.LISTS_SUCCESS: {
      return {...state,...action.payload}
    }

    default: {
      return state;
    }
  }
}