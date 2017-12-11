import * as actions from '../actions/work-home.action';

export interface State {
  workhomeList?:any
  noticeList?: Array<any>
  noticeDetail?: Array<any>
};

export const initialState: State = {
 
};

export function reducer(state = initialState, action: any ): State {
  switch (action.type) {
    case actions.ActionTypes.LISTS_SUCCESS:
    case actions.ActionTypes.NOTICELIST_SUCCESS:
    case actions.ActionTypes.NOTICEDETAIL_SUCCESS:
     {
      return {...state,...action.payload}
    }

    default: {
      return state;
    }
  }
}