import { Injectable ,Inject} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {App} from 'ionic-angular'
import { Action } from '@ngrx/store';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import { ProjectServiceProvider } from '../providers'
import * as fromRoot from '../reducer'
import { Store } from '@ngrx/store'
import * as actions from '../actions/project.action'
import { ToastSitutionProvider } from '../providers'
@Injectable()
export class ProjectEffects {
  @Effect() error$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.ERROR)
  .map(res => {
    this.appCtrl.getActiveNav().push('LoginPage')
    this.toast.message(this.msg.token)
    return new actions.ErrorSuccessAction({})
  })

  @Effect() prodetail$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.PRODETAIL)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>{
    return this.service.proDetail(auth.id, auth.token, auth.emp.teamId,info)})
  .map(res => {
   
    if(res.success) {
      return new actions.proDetailSuccessAction({})
    }else if(res.msgCode=='-1'){
      return new actions.ErrorAction({})
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
  }else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
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
  }else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
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
      const data = res.dataObject.map(peo => ({
        name: peo.emp.name,
        id: peo.id,
        empId: peo.empId
      }))
      return new actions.proMembersListSuccessAction(data)
  }else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
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
      const data = res.dataObject.map(proid => ({
        name: proid.name,
        id:proid.id,
        parentId: proid.parentId
      }))
      return new actions.currProjectTreeMenuSuccessAction(data)
  }else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
  
  })
  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private service: ProjectServiceProvider,
    private toast: ToastSitutionProvider,
    private appCtrl: App,
    @Inject('MSG') private msg
  ) {}
}