import { Injectable,Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {App} from 'ionic-angular'
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store'
import * as actions from '../actions/work-home.action'
import * as fromRoot from '../reducer'
import {WorkhomeServiceProvider } from '../providers'
import { ToastSitutionProvider } from '../providers'

@Injectable()
export class WokrHomeEffects {

  @Effect() error$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.ERROR)
  .map(res => {
    this.appCtrl.getActiveNav().push('LoginPage')
    this.toast.message(this.msg.token)
    return new actions.ErrorSuccessAction({})
  })
 

  @Effect() getList$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.LISTS)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info, auth])=>this.service.getList(auth.id, auth.token, auth.emp.teamId,auth.emp.id, info))
  .map(res => {
    if(res.success) {
      const data = {
        chatGroupPage:res.dataObject.chatGroupPage.chatGroupPage?res.dataObject.chatGroupPage.chatGroupPage.result.map(rel => ({
          pageNo: res.dataObject.chatGroupPage.chatGroupPage.pageNo,
          totalPages: res.dataObject.chatGroupPage.chatGroupPage.totalPages,
          name: rel.name,
          contents: rel.contents,
          updateTime: rel.updateTime.split(' ')[0],
          id: rel.parentId,
          id1: rel.id,
          type: rel.type
        })):[],
      }
      return new actions.ListSuccessAction(data)
    }  
    else if(res.msgCode=='-1'){
      return new actions.ErrorAction({})
    }
  })
  @Effect() refreshLists$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.REFRESH)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info, auth])=>this.service.getList(auth.id, auth.token, auth.emp.teamId,auth.emp.id, info))
  .map(res => {
    if(res.success) {
      const data = {
        chatGroupPage:res.dataObject.chatGroupPage.chatGroupPage?res.dataObject.chatGroupPage.chatGroupPage.result.map(rel => ({
          pageNo: res.dataObject.chatGroupPage.chatGroupPage.pageNo,
          totalPages: res.dataObject.chatGroupPage.chatGroupPage.totalPages,
          name: rel.name,
          contents: rel.contents,
          updateTime: rel.updateTime.split(' ')[0],
          id: rel.parentId,
          id1: rel.id,
          type: rel.type
        })):[]
      }
      return new actions.refreshSuccessAction(data)
    }  else if(res.msgCode=='-1'){
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
      return new actions.addGroupSuccessAction({})
    }else if(res.msgCode=='-1'){
      return new actions.ErrorAction({})
    }
    
  })
  @Effect() noticeList$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.NOTICELIST)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info, auth])=>this.service.noticeList(auth.id, auth.token, auth.emp.teamId,auth.emp.id, info))
  .map(res => {
    if(res.success) {
      const data = res.dataObject.result.map(notice=>({
        noticeId: notice.noticeId,
        title: notice.notice.title,
        contents: notice.notice.contents,
        updateTime: notice.updateTime
      }))
      return new actions.noticeListSuccessAction({noticeList:data})
    }else if(res.msgCode=='-1'){
      return new actions.ErrorAction({})
    }
    
  })
  @Effect() noticeDetail$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.NOTICEDETAIL)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info, auth])=>this.service.noticeDetail(auth.id, auth.token, auth.emp.teamId,auth.emp.id, info))
  .map(res => {
    if(res.success) {
      const data = {
        attach: res.dataObject.attach?res.dataObject.attach:'',
        attachName: res.dataObject.attachName?res.dataObject.attachName:'',
        contents: res.dataObject.contents,
        updateTime: res.dataObject.updateTime,
        title: res.dataObject.title,
        totalCount:res.dataObject.totalCount,
        notReadCount:res.dataObject.notReadCount
      }
      return new actions.noticeDetailSuccessAction({noticeDetail: data})
    }else if(res.msgCode=='-1'){
      return new actions.ErrorAction({})
    }
    
  })
  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private service: WorkhomeServiceProvider,
    private toast: ToastSitutionProvider,
    private appCtrl: App,
    @Inject('MSG') private msg
  ) {}
}