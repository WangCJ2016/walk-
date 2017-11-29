import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Store } from '@ngrx/store'
import { Actions, Effect, toPayload } from '@ngrx/effects';
import * as actions from '../actions/contacts.action'
import * as fromRoot from '../reducer'
import { ContactServiceProvider } from '../providers'
@Injectable()
export class ContactEffects {

  @Effect() load$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD)
    .map(toPayload)
    .withLatestFrom(this.store$.select(store=>store.auth.auth))
    .switchMap(([_,auth])=>this.contactService.loadContacts(auth.id, auth.token, auth.emp.teamId))
    .map(res => {
      console.log(res)
      if(res.success) {
        const contactArr = res.dataObject.map(contact=>({
          userId:contact.userId,
          name:contact.name,
          letter:contact.letter,
          userName:contact.userName,
          id:contact.id
        }))
        return new actions.LoadSuccessAction(contactArr)
    }
    })
    // 员工详情
    @Effect() empdetail$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.EMPDETAIL)
    .map(toPayload)
    .withLatestFrom(this.store$.select(store=>store.auth.auth))
    .switchMap(([empId,auth])=>this.contactService.empDetail(auth.id, auth.token, auth.emp.teamId, empId.empId))
    .map(res => {
      console.log(res)
      if(res.success) {
        const contactArr = {
          name: res.dataObject.name,
          dept: res.dataObject.dept.name,
          phone: res.dataObject.userName
        }
        return new actions.EmpDetailSuccessAction(contactArr)
    }
    })
  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private contactService: ContactServiceProvider
  ) {}
}