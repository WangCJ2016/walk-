import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import { ProjectServiceProvider } from '../providers'
import * as fromRoot from '../reducer'
import { Store } from '@ngrx/store'
import * as actions from '../actions/project.action'
@Injectable()
export class ProjectEffects {
  @Effect() prodetail$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.PRODETAIL)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>{
    return this.service.proDetail(auth.id, auth.token, auth.emp.teamId,info)})
  .map(res => {
   
    if(res.success) {
      return new actions.proDetailSuccessAction({})
  }
  })
  @Effect() propeo$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.PROPEO)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>{
    
    return this.service.propeo(auth.id, auth.token, auth.emp.teamId,info)})
  .map(res => {
   
    if(res.success) {
      return new actions.propeoActionSuccessAction(res.dataObject)
  }
  })
  @Effect() prothinglist$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.PROTHINGLIST)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>{
    
    return this.service.proThingList(auth.id, auth.token, auth.emp.teamId,info)})
  .map(res => {
    
    if(res.success) {
      return new actions.proThingListSuccessAction(res.dataObject)
  }
  })
  @Effect() promembers$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.PROMEMBERS)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>{
    return this.service.proMembers(auth.id, auth.token, auth.emp.teamId,info)})
  .map(res => {
   
    if(res.success) {
      return new actions.proMembersListSuccessAction(res.dataObject)
  }
  })
  @Effect() project_currProjectTreeMenu$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.CURRPROTREEMENU)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>{
    return this.service.currProjectTreeMenu(auth.id, auth.token, auth.emp.teamId,info)})
  .map(res => {
  
    if(res.success) {
      return new actions.currProjectTreeMenuSuccessAction(res.dataObject)
  }
  })
  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private service: ProjectServiceProvider
  ) {}
}