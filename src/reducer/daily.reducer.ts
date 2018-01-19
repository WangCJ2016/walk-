import * as actions from '../actions/daily.action';
import { dailyPeople,dailyDetail} from '../domain'
export interface State {
  dailyPeople?: dailyPeople
  dailyDetail?: dailyDetail
  dailyStatusByMonth?: Array<any>,
  msgCode?: number
};

export const initialState: State = {
  
};

export function reducer(state = initialState, action: any ): State {
  switch (action.type) {
    case actions.ActionTypes.DAILYSTAT_SUCCESS: {
      return {...state,dailyPeople:action.payload}
    }
    case actions.ActionTypes.DETAILDAILY_SCUCCESS: {
      const data = {...state.dailyDetail,...action.payload}
      return {...state,dailyDetail:data}
    }
    case actions.ActionTypes.DAILYSTATEBYMONTH_SCUCCESS:{
      return {...state,dailyStatusByMonth:action.payload}
    }
    default: {
      return state;
    }
  }
}