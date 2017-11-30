import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store'
import * as fromRoot from '../reducer'
import { DailyServiceProvider } from '../providers'
import { ToastSitutionProvider } from '../providers'
import * as actions from '../actions/daily.action'
@Injectable()
export class DailyEffects {
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
    console.log(res)
    if(res.success) {
      this.toast.message('添加成功')
      return new actions.AddDailySuccessAction({})
    }else{
        //return new actions.FailAction(res.res.msg)
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
  console.log(res)
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
  }else{
      //return new actions.FailAction(res.res.msg)
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
  console.log(res)
  if(res.success) {
    return new actions.DailyDetailSuccessAction(res.dataObject.contents)
  }else{
      //return new actions.FailAction(res.res.msg)
  }
})
  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private dailyService: DailyServiceProvider,
    private toast: ToastSitutionProvider
  ) {}
}