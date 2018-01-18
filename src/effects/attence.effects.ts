import { Injectable,Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { App } from 'ionic-angular'
import { Actions, Effect, toPayload } from '@ngrx/effects';
import * as actions from '../actions/attence.action'
import { Store } from '@ngrx/store'
import * as fromRoot from '../reducer'
import { AttenceServiceProvider } from '../providers'
import { ToastSitutionProvider} from '../providers'
@Injectable()
export class AttenceEffects {

    @Effect() error$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ERROR)
    .map(res => {
        this.appCtrl.getActiveNav().push('LoginPage')
        this.toast.message(this.msg.token)
        return new actions.ErrorSuccessAction({})
    })
    // 设置日期
    @Effect() setday$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.GETATTENDACE)
    .map(toPayload)
    .withLatestFrom(this.store$.select(store=> store.auth.auth))
    .switchMap(([_, auth]) => this.attenceService.getAttence(auth.id,auth.token,auth.emp.teamId,auth.emp.deptId,auth.emp.id))
    .map(res => {
        if(res.success) {
          return new actions.GetAttendacnceSuccessAction(res.dataObject)
        }
        else if(res.msgCode=='-1'){
            return new actions.ErrorAction({})
          }
    })
       

    // 提交签到信息
    @Effect() sign$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.SIGNIN)
    .map(toPayload)
    .withLatestFrom(this.store$.select(store=> store.auth.auth))
    .switchMap(([info, auth]) => this.attenceService.sign(
        auth.id,
        auth.token,
        auth.emp.teamId,
        auth.emp.deptId,
        auth.emp.id,
        info
    ))
    .map(res => {
        if(res.res.success) {
            this.toast.message('打卡成功')
          return new actions.GetAttendacnceAction({})
        }else{
             if(res.res.msgCode=='-1'){
                return new actions.ErrorAction({})
              }
            this.toast.message(res.res.msg)
            return new actions.FailAction(res.res.msg)
        }
    })
    // 考勤列表
    @Effect() attencerecord$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ATTENCERECORD)
    .map(toPayload)
    .withLatestFrom(this.store$.select(store=> store.auth.auth))
    .switchMap(([time, auth]) => this.attenceService.attenceRecord(
        auth.id,
        auth.token,
        auth.emp.teamId,
        auth.emp.deptId,
        auth.emp.id,
        time.time
    ))
    .map(res => {
        if(res.success) {
           const data =  res.dataObject.map(v=>{
                if(v.pictures) {
                    return {
                        type: v.type,
                        clockTime: v.clockTime,
                        trueAddress: v.trueAddress,
                        pictures: v.pictures.split(',')
                    }
                }else {
                    return {
                        type: v.type,
                        clockTime: v.clockTime,
                        trueAddress: v.trueAddress,
                        pictures:[]
                    }
                }
            })
          return new actions.AttenceRecordSuccessAction(data)
        }else if(res.msgCode=='-1'){
            return new actions.ErrorAction({})
          }
    })
    //考勤统计在岗情况
    @Effect() attencestat$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ATTENCESTAT)
    .map(toPayload)
    .withLatestFrom(this.store$.select(store=> store.auth.auth))
    .switchMap(([time, auth]) => this.attenceService.attenceStat(
        auth.id,
        auth.token,
        auth.emp.teamId,
        time.time
    ))
    .map(res => {
        if(res.success) {
            const data = {
                notIn: {
                    notInCount: res.dataObject.notIn.notInCount,
                    notInList: res.dataObject.notIn.notInList.map(v =>({
                        status: v.status,
                        name: v.emp.empName,
                        head: v.emp.photo
                    }))
                },
                isIn: {
                    isInCount: res.dataObject.isIn.isInCount,
                    isInList: res.dataObject.isIn.isInList.map(v =>({
                        status: v.status,
                        name: v.emp.empName,
                        head: v.emp.photo
                    }))
                },
            }
          return new actions.AttenceStatSuccessAction(data)
        }else if(res.msgCode=='-1'){
            return new actions.ErrorAction({})
          }
    })
    // 考勤设置时获取截止日期
    @Effect() getendate$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.GETENDDATE)
    .map(toPayload)
    .withLatestFrom(this.store$.select(store=> store.auth.auth))
    .switchMap(([info, auth]) => {
        return this.attenceService.getEndate(
           auth.id,
           auth.token,
           auth.emp.teamId,
           auth.emp.deptId,
           auth.emp.id,
           info
       )
    })
    .map(res => {
        if(res.success) {
          return new actions.getEndDateSuccessAction({endDate:res.dataObject})
        }else{
            this.toast.message(res.msg)
             if(res.msgCode=='-1'){
                return new actions.ErrorAction({})
              }
            return new actions.FailAction(res.msg)
        }
    })
     // 设置员工考勤状态
     @Effect() setattence$: Observable<Action> = this.actions$
     .ofType(actions.ActionTypes.SETATTENCE)
     .map(toPayload)
     .withLatestFrom(this.store$.select(store=> store.auth.auth))
     .switchMap(([info, auth]) => {
         return this.attenceService.setAttence(
            auth.id,
            auth.token,
            auth.emp.teamId,
            auth.emp.id,
            info
        )
     })
     .map(res => {
         if(res.success) {
             this.toast.message('设置成功')
             this.appCtrl.getActiveNav().pop()
           return new actions.setAttenceSuccessAction({})
         }else{
             if(res.msgCode=='-1'){
                return new actions.ErrorAction({})
              }
             return new actions.FailAction(res.msg)
         }
     })
     @Effect() dailyState$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.ATTENCESTATUSBYMONTH)
        .map(toPayload)
        .withLatestFrom(this.store$.select(store=>store.auth.auth))
        .switchMap(([info, auth])=>this.attenceService.statusByMonth(
        auth.id,
        auth.token,
        auth.emp.teamId,
        auth.emp.id,
        info
        ))
        .map(res => {
        
        if(res.success) {
        
            return new actions.statusByMontSuccessAction(res.dataObject)
        }else if(res.msgCode=='-1'){
            return new actions.ErrorAction({})
          }
        })
    constructor(
        private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private attenceService: AttenceServiceProvider,
        private toast: ToastSitutionProvider,
        private appCtrl: App,
        @Inject('MSG') private msg
    ) {}
}