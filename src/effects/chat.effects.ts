import { Injectable,Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { App } from 'ionic-angular'
import { Actions, Effect, toPayload } from '@ngrx/effects';
import * as actions from '../actions/chat.action'
import { Store } from '@ngrx/store'
import * as fromRoot from '../reducer'
import { ChatServiceProvider } from '../providers'
import { ToastSitutionProvider } from '../providers'

@Injectable()
export class ChatEffects {
  @Effect() error$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.ERROR)
  .map(res => {
    this.appCtrl.getActiveNav().push('LoginPage')
    this.toast.message(this.msg.token)
    return new actions.ErrorSuccessAction({})
  })
 
  // chatlist
  @Effect() chatlist$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.CHATLIST)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.service.chatList(auth.id, auth.token, auth.emp.teamId,info))
  .map(res => {
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
    }else if(res.msgCode=='-1'){
      return new actions.ErrorAction({})
    }
  })
 // sendchat
 @Effect() sendchat$: Observable<Action> = this.actions$
 .ofType(actions.ActionTypes.SENDCHAT)
 .map(toPayload)
 .withLatestFrom(this.store$.select(store=>store.auth.auth))
 .switchMap(([info,auth])=>this.service.sendChat(auth.id, auth.token, auth.emp.teamId,auth.emp.deptId,auth.emp.id,info))
 .map(res => {
   if(res.success) {
     const data = {
      chatGroupId: res.dataObject.chatGroupId,
      initatorEmp: res.dataObject.initatorEmp,
      contents: res.dataObject.contents?res.dataObject.contents:'',
      attach: res.dataObject.attach?res.dataObject.attach:'',
      
     }
     return new actions.sendChatSuccessAction(data)
   }else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
 })
 @Effect() addGroup$: Observable<Action> = this.actions$
 .ofType(actions.ActionTypes.ADDGROUP)
 .map(toPayload)
 .withLatestFrom(this.store$.select(store=>store.auth.auth))
 .switchMap(([info, auth])=>this.service.addGroup(auth.id, auth.token, auth.emp.teamId,auth.emp.deptId,auth.emp.id, info))
 .map(res => {
   if(res.success) {
     this.appCtrl.getRootNav().push('ChatPage',{name: res.dataObject.name, id: res.dataObject.id})
     return new actions.addGroupSuccessAction({
       id: res.dataObject.id,
       contents: res.dataObject.contents,
       name: res.dataObject.name,
       type: res.dataObject.type
     })
   }else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
   
 })
  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private service: ChatServiceProvider,
    private appCtrl: App,
    private toast: ToastSitutionProvider,
    @Inject('MSG') private msg
  ) {}
}