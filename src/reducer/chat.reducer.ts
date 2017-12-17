import * as actions from '../actions/chat.action'

export interface State {
   chatList?: Array<any>
};

export const initialState: State = {
  chatList: []
};

export function reducer(state = initialState, action: any ): State {
  switch (action.type) {
    case actions.ActionTypes.CHATLISTINITIAL: {
      return {...state,chatList:[]}
    }
    case actions.ActionTypes.CHATLIST_SUCCESS: {
      const data = [...action.payload,...state.chatList]
      return {...state,chatList:data}
    }
    case actions.ActionTypes.SENDCHAT_SUCCESS: {
      const data = [...state.chatList,action.payload]
      return {...state, chatList:data}
    }
    default: {
      return state;
    }
  }
}