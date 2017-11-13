import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import {go} from '@ngrx/router-store';
import * as actions from '../actions/auth.action'
import { Router } from '@angular/router';
@Injectable()
export class AuthEffects {
    @Effect() login$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGIN)
    .map(toPayload)
    .map(_ => {
        console.log(1)
        return new actions.LoginSuccessAction(1)})
    // .switchMap((val: {phoneNum: string, password: string}) => new actions.LoginSuccessAction())
    
    @Effect()
    navigateHome$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.LOGIN_SUCCESS)
      .do(()=>this.router.navigate(['register']))
      

    constructor(
        private actions$: Actions,
        private router: Router,
    ) {}
}
