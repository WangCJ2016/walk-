import * as actions from '../actions/project.action';
export interface State {
  propeo?:any,
  proThingLists?:any
};

export const initialState: State = {
  propeo:null
};

export function reducer(state = initialState, action: any ): State {
  switch (action.type) {
    case actions.ActionTypes.PROPEO_SCUCCESS: {
      return {...state,propeo:action.payload}
    }
    case actions.ActionTypes.PROTHINGLIST_SCUCCESS: {
      return {...state,proThingLists:action.payload}
    }
    default: {
      return state;
    }
  }
}