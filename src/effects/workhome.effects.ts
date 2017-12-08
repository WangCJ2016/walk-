import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store'
import * as actions from '../actions/work-home.action'
import * as fromRoot from '../reducer'
import {WorkhomeServiceProvider } from '../providers'

@Injectable()
export class WokrHomeEffects {
  @Effect() getList$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.LISTS)
  .mapTo(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info, auth])=>this.service.getList(auth.id, auth.token, auth.emp.teamId,auth.emp.id, info))
  .map(res => {
    console.log(res)
    if(res.success) {
      const data = {
        chatGroupPage:res.dataObject.chatGroupPage.chatGroupPage?res.dataObject.chatGroupPage.chatGroupPage.result.map(res => ({
          name: res.name,
          contents: res.contents,
          updateTime: res.updateTime,
          id: res.id
        })):[],
        notice:res.dataObject.notice.notice?res.dataObject.notice.notice.result.map(res => ({
          name: res.name,
          contents: res.contents,
          updateTime: res.updateTime,
          id: res.id
        })):[],
      }
      return new actions.ListSuccessAction(data)
    }
  })

  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private service: WorkhomeServiceProvider
  ) {}
}