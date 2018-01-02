import * as actions from '../actions/work-home.action';

export interface State {
  workhomeList?:Array<any>
  noticeList?: Array<any>
  noticeDetail?: Array<any>
};

export const initialState: State = {
  workhomeList:[]
};

export function reducer(state = initialState, action: any ): State {
  switch (action.type) {
    case actions.ActionTypes.LISTS_SUCCESS:{
      console.log(action.payload)
      const workhomeList = [...state.workhomeList,...action.payload.chatGroupPage]
      return {...state,workhomeList:workhomeList}
    }
    case actions.ActionTypes.NOTICELIST_SUCCESS:
    case actions.ActionTypes.NOTICEDETAIL_SUCCESS:
     {
      return {...state,...action.payload}
    }
    case actions.ActionTypes.REFRESH_SUCCESS: {
      return {...state,workhomeList:action.payload.chatGroupPage}
    }
    default: {
      return state;
    }
  }
}