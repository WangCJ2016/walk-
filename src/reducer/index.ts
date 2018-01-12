import { NgModule } from '@angular/core';
import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store';

import { SharedModule} from '../app/shared.modules'
import * as fromAuth from './auth.reducer';
import * as fromContacts from './contact.reducer'
import * as fromAttence from './attence.reducer'
import * as fromTeam from './team.reducer'
import * as fromDaily from './daily.reducer'
import * as fromCreatwork from './creatwork.reducer'
import * as fromWorkhome from './workhome.reducer'
import * as fromChat from './chat.reducer'
import * as fromProject from './project.reducer'
import * as fromApply from './apply.reducer'

export interface State {
         auth: fromAuth.State,
         contacts: fromContacts.State,
         attence: fromAttence.State,
         team: fromTeam.State,
         daily: fromDaily.State,
         creatwork: fromCreatwork.State,
         workhome: fromWorkhome.State,
         chat: fromChat.State,
         project: fromProject.State,
         apply: fromApply.State
};

const initialState: State = {
        auth: fromAuth.initialState,
        contacts: fromContacts.initialState,
        attence: fromAttence.initialState,
        team: fromTeam.initialState,
        daily: fromDaily.initialState,
        creatwork: fromCreatwork.initialState,
        workhome: fromWorkhome.initialState,
        chat: fromChat.initialState,
        project: fromProject.initialState,
        apply: fromApply.initialState
};

const reducers = {
    auth: fromAuth.reducer,
    contacts: fromContacts.reducer,
    attence: fromAttence.reducer,
    team: fromTeam.reducer,
    daily: fromDaily.reducer,
    creatwork: fromCreatwork.reducer,
    workhome: fromWorkhome.reducer,
    chat: fromChat.reducer,
    project: fromProject.reducer,
    apply: fromApply.reducer
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