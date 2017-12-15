import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import * as actions from '../actions/chat.action'
import { Store } from '@ngrx/store'
import * as fromRoot from '../reducer'
import { ChatServiceProvider } from '../providers'

@Injectable()
export class ChatEffects {
  // chatlist
  @Effect() chatlist$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.CHATLIST)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.service.chatList(auth.id, auth.token, auth.emp.teamId,info))
  .map(res => {
    console.log(res)
    if(res.success) {
      const data = res.dataObject.result.reverse().map(chat=>({
        chatGroupId: chat.chatGroupId,
        initatorEmp: chat.initatorEmp,
        contents: chat.contents?chat.contents:'',
        attach: chat.attach?chat.attach:'',
        pageNo: res.dataObject.pageNo,
        totalPages: res.dataObject.totalPages,
        updateTime: chat.updateTime
      }))
      return new actions.ChatListSuccessAction(data)
    }
  })
 // sendchat
 @Effect() sendchat$: Observable<Action> = this.actions$
 .ofType(actions.ActionTypes.SENDCHAT)
 .map(toPayload)
 .withLatestFrom(this.store$.select(store=>store.auth.auth))
 .switchMap(([info,auth])=>this.service.sendChat(auth.id, auth.token, auth.emp.teamId,auth.emp.deptId,auth.emp.id,info))
 .map(res => {
   console.log(res)
   if(res.success) {
     const data = {
      chatGroupId: res.dataObject.chatGroupId,
      initatorEmp: res.dataObject.initatorEmp,
      contents: res.dataObject.contents?res.dataObject.contents:'',
      attach: res.dataObject.attach?res.dataObject.attach:'',
      
     }
     return new actions.sendChatSuccessAction(data)
   }
 })
  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private service: ChatServiceProvider
  ) {}
}