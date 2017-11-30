import * as actions from '../actions/daily.action';
import { dailyPeople} from '../domain'
export interface State {
  dailyPeople?: dailyPeople
  dailyDetail?:string
};

export const initialState: State = {
  
};

export function reducer(state = initialState, action: any ): State {
  switch (action.type) {
    case actions.ActionTypes.DAILYSTAT_SUCCESS: {
      return {...state,dailyPeople:action.payload}
    }
    case actions.ActionTypes.DETAILDAILY_SCUCCESS: {
      return {...state,dailyDetail:action.payload}
    }
    default: {
      return state;
    }
  }
}