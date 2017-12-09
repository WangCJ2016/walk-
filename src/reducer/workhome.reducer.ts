import * as actions from '../actions/work-home.action';

export interface State {
  workhomeList:any
  noticeList: Array<any>
};

export const initialState: State = {
  workhomeList: {},
  noticeList: []
};

export function reducer(state = initialState, action: any ): State {
  switch (action.type) {
    case actions.ActionTypes.LISTS_SUCCESS:
    case actions.ActionTypes.NOTICELIST_SUCCESS: {
      return {...state,...action.payload}
    }

    default: {
      return state;
    }
  }
}