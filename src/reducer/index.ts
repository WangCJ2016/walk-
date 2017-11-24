import { NgModule } from '@angular/core';
import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule} from '../app/shared.modules'
import * as fromAuth from './auth.reducer';
import * as fromContacts from './contact.reducer'
import * as fromAttence from './attence.reducer'



export interface State {
         auth: fromAuth.State,
         contacts: fromContacts.State,
         attence: fromAttence.State
};

const initialState: State = {
        auth: fromAuth.initialState,
        contacts: fromContacts.initialState,
        attence: fromAttence.initialState
};

const reducers = {
    auth: fromAuth.reducer,
    contacts: fromContacts.reducer,
    attence: fromAttence.reducer
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
        StoreDevtoolsModule.instrumentOnlyWithExtension({
          maxAge: 5
        })
    ]
})
export class AppStoreModule {}