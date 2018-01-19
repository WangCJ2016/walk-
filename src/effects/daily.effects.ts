import { Injectable,Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {App} from 'ionic-angular'
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store'
import * as fromRoot from '../reducer'
import { DailyServiceProvider } from '../providers'
import { ToastSitutionProvider } from '../providers'
import * as actions from '../actions/daily.action'
@Injectable()
export class DailyEffects {

  @Effect() error$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.ERROR)
  .map(res => {
    this.appCtrl.getActiveNav().push('LoginPage')
    this.toast.message(this.msg.token)
    return new actions.ErrorSuccessAction({})
  })
  // 添加日报
  @Effect() addDaily$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.ADDDAILY)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([cn, auth])=>this.dailyService.addDaily(
    auth.id,
    auth.token,
    auth.emp.teamId,
    auth.emp.deptId,
    auth.emp.id,
    cn.content
  ))
  .map(res => {

    if(res.success) {
      this.toast.message('添加成功')
      return new actions.AddDailySuccessAction({})
    }else if(res.msgCode=='-1'){
      return new actions.ErrorAction({})
    }
})
// 日报统计上交情况
@Effect() dailystat$: Observable<Action> = this.actions$
.ofType(actions.ActionTypes.DAILYSTAT)
.map(toPayload)
.withLatestFrom(this.store$.select(store=>store.auth.auth))
.switchMap(([submitDate, auth])=>this.dailyService.dailyStat(
  auth.id,
  auth.token,
  auth.emp.teamId,
  submitDate.submitDate
))
.map(res => {
  if(res.success) {
   const data = {
              notHandIn: {
                  notHandInCount: res.dataObject.notHandIn.notHandInCount,
                  notHandInList: res.dataObject.notHandIn.notHandInList.map(v =>({
                        empId: v.empId,
                        status: v.status,
                        name: v.emp.empName,
                        head: v.emp.photo
                    }))
                },
                handIn: {
                  handInCount: res.dataObject.handIn.handInCount,
                  handInList: res.dataObject.handIn.handInList.map(v =>({
                        empId: v.empId,
                        status: v.status,
                        name: v.emp.empName,
                        head: v.emp.photo
                    }))
                },
            }
    return new actions.DailyStatSuccessAction(data)
  }else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
})
// 查看成员日报
@Effect() detailDaily$: Observable<Action> = this.actions$
.ofType(actions.ActionTypes.DETAILDAILY)
.map(toPayload)
.withLatestFrom(this.store$.select(store=>store.auth.auth))
.switchMap(([info, auth])=>this.dailyService.dailyDetail(
  auth.id,
  auth.token,
  auth.emp.teamId,
  auth.emp.deptId,
  auth.emp.id,
  info.empId1,
  info.submitDate
))
.map(res => {
  if(res.success) {
    if(res.dataObject) {
      return new actions.DailyDetailSuccessAction({
        name:res.dataObject.emp.empName,
        contents:res.dataObject.contents,
        dailyId:res.dataObject.id,
        stars: res.dataObject.star?res.dataObject.star:null,
        empId: res.dataObject.empId,
        deptId: res.dataObject.deptId
      })
    }else{
      return new actions.DailyDetailSuccessAction({
        contents:'没有日报内容'
      })
    }
  }else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
})
// 修改日报
@Effect() modifyDaily$: Observable<Action> = this.actions$
.ofType(actions.ActionTypes.MODIFY)
.map(toPayload)
.withLatestFrom(this.store$.select(store=>store.auth.auth))
.switchMap(([info, auth])=>this.dailyService.modify(
  auth.id,
  auth.token,
  auth.emp.teamId,
  info
))
.map(res => {
  this.toast.message('已修改')
  if(res.success) {
    return new actions.ModifySuccessAction('')
  }else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
})

// 月日报状态
// 修改日报
@Effect() dailyState$: Observable<Action> = this.actions$
.ofType(actions.ActionTypes.DAILYSTATEBYMONTH)
.map(toPayload)
.withLatestFrom(this.store$.select(store=>store.auth.auth))
.switchMap(([info, auth])=>this.dailyService.dailyStateByMonth(
  auth.id,
  auth.token,
  auth.emp.teamId,
  auth.emp.id,
  info
))
.map(res => {
  
  if(res.success) {
   
    return new actions.dailyStateByMonthSuccessAction(res.dataObject)
  }
  else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
})
  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private dailyService: DailyServiceProvider,
    private toast: ToastSitutionProvider,
    private appCtrl: App,
    @Inject('MSG') private msg
  ) {}
}