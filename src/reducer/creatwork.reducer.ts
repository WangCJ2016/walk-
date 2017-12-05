import * as actions from '../actions/creatework.action'
import { createObj, applyList, applyFlow, zishiwu} from '../domain'
export interface State {
     workdetail?: createObj
     applyList?: Array<applyList>
     applyFlow?: Array<applyFlow>
     zishiwu?:Array<zishiwu>
};

export const initialState: State = {
  applyList:[],
  applyFlow:[]
};

export function reducer(state = initialState, action: any ): State {
  switch (action.type) {
    case actions.ActionTypes.GETWORKDETAIL_SUCCESS: {
      return {...state,workdetail:action.payload}
    }
    case actions.ActionTypes.APPLYLIST_SUCCESS: {
      return {...state,applyList:action.payload}
    }
    case actions.ActionTypes.APPLYFLOW_SUCCESS: {
      return {...state,applyFlow:action.payload}
    } 
    case actions.ActionTypes.ZISHIWU_SUCCESS: {
      return {...state,zishiwu:action.payload}
    } 
    default: {
      return state;
    }
  }
}