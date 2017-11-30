import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import * as actions from '../actions/attence.action'
import { Store } from '@ngrx/store'
import * as fromRoot from '../reducer'
import { AttenceServiceProvider } from '../providers'
import { ToastSitutionProvider} from '../providers'
@Injectable()
export class AttenceEffects {
    // 设置日期
    @Effect() setday$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.GETATTENDACE)
    .map(toPayload)
    .withLatestFrom(this.store$.select(store=> store.auth.auth))
    .switchMap(([_, auth]) => this.attenceService.getAttence(auth.id,auth.token,auth.emp.teamId,auth.emp.deptId,auth.emp.id))
    .map(res => {
        console.log(res)
        if(res.success) {
          return new actions.GetAttendacnceSuccessAction(res.dataObject)
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
        console.log(res)
        if(res.res.success) {
            this.toast.message('打卡成功')
          return new actions.SignSuccessAction(res.type=='1'?'2':'1')
        }else{
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
        console.log(res)
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
        }else{
            return new actions.FailAction(res.msg)
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
        console.log(res)
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
        }else{
            return new actions.FailAction(res.msg)
        }
    })
    constructor(
        private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private attenceService: AttenceServiceProvider,
        private toast: ToastSitutionProvider
    ) {}
}