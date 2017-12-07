import * as actions from '../actions/creatework.action'
import { createObj, applyList, applyFlow, zishiwu, shiwuitem} from '../domain'
export interface State {
     workdetail?: createObj
     applyList?: Array<applyList>
     applyFlow?: Array<applyFlow>
     zishiwu?:Array<zishiwu>
     shiwuList?: {
       pageNo: number,
       totalPages: number,
       list: Array<shiwuitem>
     }
     workPlate?:any,
     requireList?:Array<any>
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
    case actions.ActionTypes.SHIWULIST_SUCCESS: {
      return {...state,shiwuList:action.payload}
    } 
    case actions.ActionTypes.WORKPLATE_SUCCESS: {
      return {...state,workPlate:action.payload}
    } 
    case actions.ActionTypes.REQUIRELIST_SUCCESS: {
      return {...state,requireList:action.payload}
    } 
    default: {
      return state;
    }
  }
}