import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Store } from '@ngrx/store'
import { Actions, Effect, toPayload } from '@ngrx/effects';
import * as actions from '../actions/apply.action'
import * as fromRoot from '../reducer'
import { ApplyProvider } from '../providers'


@Injectable()
export class ApplyEffects {
  // shenpi列表
  @Effect() applylist$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.APPLYLIST)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.service.applyList(auth.id, auth.token, auth.emp.teamId,auth.emp.id,info))
  .map(res => {
    if(res.success) {
      return new actions.appplylistSuccessAction(res.dataObject)
    }
  })

  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private service: ApplyProvider
  ) {}
}