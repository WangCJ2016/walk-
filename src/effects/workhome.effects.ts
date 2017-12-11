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
  .map(toPayload)
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
        // notice:res.dataObject.notice.notice?res.dataObject.notice.notice.map(res => ({
        //   name: res.name,
        //   contents: res.contents,
        //   updateTime: res.updateTime,
        //   id: res.id
        // })):[],
      }
      return new actions.ListSuccessAction({workhomeList:data})
    }
    
  })
  @Effect() addGroup$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.ADDGROUP)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info, auth])=>this.service.addGroup(auth.id, auth.token, auth.emp.teamId,auth.emp.deptId,auth.emp.id, info))
  .map(res => {
    console.log(res)
    if(res.success) {
      return new actions.addGroupSuccessAction({})
    }
    
  })
  @Effect() noticeList$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.NOTICELIST)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info, auth])=>this.service.noticeList(auth.id, auth.token, auth.emp.teamId,auth.emp.id, info))
  .map(res => {
    console.log(res)
    if(res.success) {
      const data = res.dataObject.result.map(notice=>({
        noticeId: notice.noticeId,
        title: notice.notice.title,
        contents: notice.notice.contents,
        updateTime: notice.updateTime
      }))
      return new actions.noticeListSuccessAction({noticeList:data})
    }
    
  })
  @Effect() noticeDetail$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.NOTICEDETAIL)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info, auth])=>this.service.noticeDetail(auth.id, auth.token, auth.emp.teamId,auth.emp.id, info))
  .map(res => {
    console.log(res)
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
    }
    
  })
  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private service: WorkhomeServiceProvider
  ) {}
}