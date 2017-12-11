import * as actions from '../actions/chat.action'

export interface State {
   chatList?: Array<any>
};

export const initialState: State = {
  chatList: []
};

export function reducer(state = initialState, action: any ): State {
  switch (action.type) {
    case actions.ActionTypes.CHATLIST_SUCCESS: {
      return {...state,...action.payload}
    }

    default: {
      return state;
    }
  }
}