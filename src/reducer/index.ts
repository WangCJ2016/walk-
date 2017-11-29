import { NgModule } from '@angular/core';
import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store';

import { SharedModule} from '../app/shared.modules'
import * as fromAuth from './auth.reducer';
import * as fromContacts from './contact.reducer'
import * as fromAttence from './attence.reducer'
import * as fromTeam from './team.reducer'


export interface State {
         auth: fromAuth.State,
         contacts: fromContacts.State,
         attence: fromAttence.State,
         team: fromTeam.State
};

const initialState: State = {
        auth: fromAuth.initialState,
        contacts: fromContacts.initialState,
        attence: fromAttence.initialState,
        team: fromTeam.initialState
};

const reducers = {
    auth: fromAuth.reducer,
    contacts: fromContacts.reducer,
    attence: fromAttence.reducer,
    team: fromTeam.reducer
}
const productionReducers: ActionReducer<State> = combineReducers(reducers)
// const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers)
export function reducer(state = initialState, action: any ): State {
   return productionReducers(state, action)
}

@NgModule({
    imports: [
        SharedModule,
        StoreModule.provideStore(reducer),
        // StoreDevtoolsModule.instrumentOnlyWithExtension({
        //   maxAge: 5
        // })
    ]
})
export class AppStoreModule {}