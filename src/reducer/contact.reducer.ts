import * as contactActions from '../actions/contacts.action';
import { contact } from '../domain'

export interface State {
         contacts: contact[]
};

export const initialState: State = {
          contacts: [{
              name: '李冰冰',
              phoneNum: '18868877305'
          },{
            name: '王冰冰',
            phoneNum: '18868877305'
        },{
            name: '赵冰冰',
            phoneNum: '18868877305'
        }]
};

export function reducer(state = initialState, action: contactActions.Actions ): State {
    switch (action.type) {
        // case class.ActionTypes.TYPE: {
        //     return {
        //         // return new class state
        //     };
        // }

        default: {
            return state;
        }
    }
}