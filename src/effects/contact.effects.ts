import { Injectable,Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {App} from 'ionic-angular'
import { Action } from '@ngrx/store';
import { Store } from '@ngrx/store'
import { Actions, Effect, toPayload } from '@ngrx/effects';
import * as actions from '../actions/contacts.action'
import * as fromRoot from '../reducer'
import { ContactServiceProvider } from '../providers'
import { ToastSitutionProvider } from '../providers'

@Injectable()
export class ContactEffects {
  @Effect() error$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.ERROR)
  .map(res => {
    this.appCtrl.getActiveNav().push('LoginPage')
    this.toast.message(this.msg.token)
    return new actions.ErrorSuccessAction({})
  })

  @Effect() load$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD)
    .map(toPayload)
    .withLatestFrom(this.store$.select(store=>store.auth.auth))
    .switchMap(([_,auth])=>this.contactService.loadContacts(auth.id, auth.token, auth.emp.teamId))
    .map(res => {
      if(res.success) {
        const contactArr = res.dataObject.map(contact=>({
          userId:contact.userId,
          name:contact.name,
          letter:contact.letter,
          userName:contact.userName,
          id:contact.id,
          photo:contact.photo?contact.photo:''
        }))
        return new actions.LoadSuccessAction(contactArr)
    }else if(res.msgCode=='-1'){
      return new actions.ErrorAction({})
    }
    })
    // 员工详情
    @Effect() empdetail$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.EMPDETAIL)
    .map(toPayload)
    .withLatestFrom(this.store$.select(store=>store.auth.auth))
    .switchMap(([empId,auth])=>this.contactService.empDetail(auth.id, auth.token, auth.emp.teamId, empId.empId))
    .map(res => {
      
      if(res.success) {
        const contactArr = {
          name: res.dataObject.name,
          dept: res.dataObject.dept.name,
          phone: res.dataObject.userName,
          empId: res.dataObject.id
        }
        return new actions.EmpDetailSuccessAction(contactArr)
    }else if(res.msgCode=='-1'){
      return new actions.ErrorAction({})
    }
    })
     // 员工选择详情
     @Effect() empchooselist$: Observable<Action> = this.actions$
     .ofType(actions.ActionTypes.EMPCHOOSELIST)
     .map(toPayload)
     .withLatestFrom(this.store$.select(store=>store.auth.auth))
     .switchMap(([_,auth])=>this.contactService.emp_empChooseList(auth.id, auth.token, auth.emp.teamId, auth.emp.id,auth.emp.deptId))
     .map(res => {
       if(res.success) {
         const data = {
          juniorList: res.dataObject.juniorList.map(v=>({
            name: v.name,
            id: v.id,
            head:v.photo?v.photo:''
          })),
          peersList: res.dataObject.peersList.map(v=>({
            name: v.name,
            id: v.id,
            head:v.photo?v.photo:''
          })),
          superiorList: res.dataObject.superiorList.map(v=>({
            name: v.name,
            id: v.id,
            head:v.photo?v.photo:''
          }))
         }
         return new actions.EmpChooseListSuccessAction(data)
     }else if(res.msgCode=='-1'){
      return new actions.ErrorAction({})
    }
     })
  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private contactService: ContactServiceProvider,
    private toast: ToastSitutionProvider,
    private appCtrl: App,
    @Inject('MSG') private msg
  ) {}
}