import * as actions from '../actions/apply.action';

export interface State {
     apply1?: any
     apply2?: any
     apply3?: any
};

export const initialState: State = {
  apply1: null,
  apply2: null,
  apply3: null
};

export function reducer(state = initialState, action: any ): State {
  switch (action.type) {
    case actions.ActionTypes.APPLYLIST_SUCCESS: {
      const handleResult =  applylistHanlde(action.payload, state) 
      return {...state,...handleResult}
    }

    default: {
      return state;
    }
  }
}

function applylistHanlde(res,state) {
  if(res.pageNo === 1) {
    if(res.result[0].type === 1) {
      return {apply1: res}
    }
    if(res.result[0].type === 2) {
      return {apply2: res}
    }
    if(res.result[0].type === 3) {
      return {apply3: res}
    }
  }else {
    if(res.result[0].type === 1) {
      const result = [...state.apply1.result,res.result]
      const apply1 = {...res,result:result}
      return {apply1: apply1}
    }
    if(res.result[0].type === 2) {
      const result = [...state.apply2.result,res.result]
      const apply2 = {...res,result:result}
      return {apply2: apply2}
    }
    if(res.result[0].type === 3) {
      const result = [...state.apply3.result,res.result]
      const apply3 = {...res,result:result}
      return {apply3: apply3}
    }
  }
}