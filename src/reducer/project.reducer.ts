import * as actions from '../actions/project.action';
export interface State {
  propeo?:any,
  proThingLists?:any
  proidlist?: any
  promembers?: any
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
      if(action.payload.pageNo===1) {
        return {...state,proThingLists:action.payload}
      }else{
        const result = [...state.proThingLists.result,...action.payload.result]
        const data = {...action.payload,result:result}
        return {...state,proThingLists:data}
      }
    }
    case actions.ActionTypes.CURRPROTREEMENU_SCUCCESS:{
      return {...state,proidlist:action.payload}
    }
    case actions.ActionTypes.PROMEMBERS_SCUCCESS: {
      return {...state,promembers:action.payload}
    }
    default: {
      return state;
    }
  }
}