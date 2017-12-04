import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Store } from '@ngrx/store'
import { App } from 'ionic-angular'
import { Actions, Effect, toPayload } from '@ngrx/effects';
import * as actions from '../actions/creatework.action'
import * as fromRoot from '../reducer'
import { CreatworkServiceProvider } from '../providers'
import { ToastSitutionProvider } from '../providers'
@Injectable()
export class CreatWorkEffects {
  // 创建周计划
  @Effect() creatplanez$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.PLANZSUBMIT)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.addPlanWeek(auth.id, auth.token, auth.emp.teamId, auth.emp.deptId,auth.emp.id,info))
  .map(res => {
    console.log(res)
    const data = JSON.parse(res)
    if(data.res.success) {
      this.app.getRootNav().push('PlanzDetailPage',{type:data.type,id:data.res.dataObject})
      return new actions.planzsubmitSuccessAction({})
  }
  })
  // 获取zhou工作详情
  @Effect() getworkdetail$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.GETWORKDETAIL)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.getWorkDetail(auth.id, auth.token, auth.emp.teamId,info))
  .map(res => {
    console.log(res)
    if(res.success&&res.dataObject) {
      const data = {
        name: res.dataObject.name?res.dataObject.name:'',
        remark: res.dataObject.remark?res.dataObject.remark:'',
        mainPerson: res.dataObject.mainPerson?res.dataObject.mainPerson:'',
        startDate: res.dataObject.startDate?res.dataObject.startDate:'',
        endDate: res.dataObject.endDate?res.dataObject.endDate:'',
        attach:res.dataObject.attach?res.dataObject.attach:'',
        attachName:res.dataObject.attachName?res.dataObject.attachName:'',
        progress:res.dataObject.progress?res.dataObject.progress:'',
        status:res.dataObject.status?res.dataObject.status:'',
        finishDate:res.dataObject.finishDate?res.dataObject.finishDate:'',
        mainPersonEmp:{
          name:res.dataObject.mainPersonEmp?res.dataObject.mainPersonEmp.name:'',
          head:res.dataObject.mainPersonEmp.photo?res.dataObject.mainPersonEmp.photo:'',
        },
        surplusDays:res.dataObject.name?res.dataObject.name:'',
      }
      return new actions.getWorkDetailSuccessAction(data)
  }
  return new actions.getWorkDetailSuccessAction({})
  })

  // 修改zhou计划
  @Effect() updateplanez$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.UPDATE)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.update(auth.id, auth.token, auth.emp.teamId, auth.emp.deptId,auth.emp.id,info))
  .map(res => {
    console.log(res)
    if(res.success) {
      this.toast.message('已提交审核')
      return new actions.updateSuccessAction({})
   }
  })
  // 创建月计划
  @Effect() creatplaney$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.PLANYSUBMIT)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.addPlanMonth(auth.id, auth.token, auth.emp.teamId, auth.emp.deptId,auth.emp.id,info))
  .map(res => {
    console.log(res)
    const data = JSON.parse(res)
    if(data.res.success) {
      this.app.getRootNav().push('PlanyDetailPage',{type:data.type,id:data.res.dataObject})
      return new actions.planysubmitSuccessAction({})
    }
  })
  // 获取zhou工作详情
  @Effect() getworkydetail$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.GETYDETAIL)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.getMonthDetail(auth.id, auth.token, auth.emp.teamId,info))
  .map(res => {
    console.log(res)
    if(res.success&&res.dataObject) {
      const data = {
        name: res.dataObject.name?res.dataObject.name:'',
        remark: res.dataObject.remark?res.dataObject.remark:'',
        mainPerson: res.dataObject.mainPerson?res.dataObject.mainPerson:'',
        year:res.dataObject.year?res.dataObject.year:'',
        month:res.dataObject.month?res.dataObject.month:'',
        attach:res.dataObject.attach?res.dataObject.attach:'',
        attachName:res.dataObject.attachName?res.dataObject.attachName:'',
        progress:res.dataObject.progress?res.dataObject.progress:'',
        status:res.dataObject.status?res.dataObject.status:'',
        finishDate:res.dataObject.finishDate?res.dataObject.finishDate:'',
        mainPersonEmp:{
          name:res.dataObject.mainPersonEmp?res.dataObject.mainPersonEmp.name:'',
          head:res.dataObject.mainPersonEmp.photo?res.dataObject.mainPersonEmp.photo:'',
        },
        surplusDays:res.dataObject.name?res.dataObject.name:'',
      }
      return new actions.getWorkDetailSuccessAction(data)
  }
  return new actions.getWorkDetailSuccessAction({})
  })
  // 修改yue计划
  @Effect() updateplaney$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.UPDATEY)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.updateY(auth.id, auth.token, auth.emp.teamId, auth.emp.deptId,auth.emp.id,info))
  .map(res => {
    console.log(res)
    if(res.success) {
      this.toast.message('已提交审核')
      return new actions.updateYSuccessAction({})
   }
  })
   // 创建会议
   @Effect() addmeeting$: Observable<Action> = this.actions$
   .ofType(actions.ActionTypes.ADDMEETING)
   .map(toPayload)
   .withLatestFrom(this.store$.select(store=>store.auth.auth))
   .switchMap(([info,auth])=>this.creatworkSerice.addMeeting(auth.id, auth.token, auth.emp.teamId, auth.emp.deptId,auth.emp.id,info))
   .map(res => {
     console.log(res)
     
     if(res.success) {
       this.app.getRootNav().push('MeetingDetailPage',{type:'mettingId',id:res.dataObject})
       return new actions.addMeetingSuccessAction({})
     }
   })
   // 获取会议详情
  @Effect() getmeetingdetail$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.MEETINGDETAIL)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.getMeetingDetail(auth.id, auth.token, auth.emp.teamId,info))
  .map(res => {
    console.log(res)
    if(res.success&&res.dataObject) {
      const data = {
        name: res.dataObject.name?res.dataObject.name:'',
        remark: res.dataObject.remark?res.dataObject.remark:'',
        initatorEmp: res.dataObject.initatorEmp?res.dataObject.initatorEmp:'',
        mainPersonEmp: res.dataObject.mainPersonEmp?res.dataObject.mainPersonEmp:'',
        empList: res.dataObject.empList?res.dataObject.empList:'',
        time: res.dataObject.startDate?res.dataObject.startDate+' '+res.dataObject.startTime:'',
        attach:res.dataObject.attach?res.dataObject.attach:'',
        attachName:res.dataObject.attachName?res.dataObject.attachName:'',
        progress:res.dataObject.progress?res.dataObject.progress:'',
        status:res.dataObject.status?res.dataObject.status:'',
        finishDate:res.dataObject.finishDate?res.dataObject.finishDate:'',
        
        surplusDays:res.dataObject.name?res.dataObject.name:'',
      }
      return new actions.getWorkDetailSuccessAction(data)
  }
  return new actions.getWorkDetailSuccessAction({})
  })
   // 修改yue计划
   @Effect() updatemeeting$: Observable<Action> = this.actions$
   .ofType(actions.ActionTypes.UPDATEMEETING)
   .map(toPayload)
   .withLatestFrom(this.store$.select(store=>store.auth.auth))
   .switchMap(([info,auth])=>this.creatworkSerice.updateMeeting(auth.id, auth.token, auth.emp.teamId, auth.emp.deptId,auth.emp.id,info))
   .map(res => {
     console.log(res)
     if(res.success) {
       this.toast.message('已提交审核')
       return new actions.meetingUpdateSuccessAction({})
    }
   })
    // 创建shenpi
    @Effect() addapply$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADDAPPLY)
    .map(toPayload)
    .withLatestFrom(this.store$.select(store=>store.auth.auth))
    .switchMap(([info,auth])=>this.creatworkSerice.addapply(auth.id, auth.token, auth.emp.teamId, auth.emp.deptId,auth.emp.id,info))
    .map(res => {
      console.log(res)
      
      if(res.success) {
        this.app.getRootNav().push('ApplyDetailPage',{type:'applyId',id:res.dataObject})
        return new actions.addapplySuccessAction({})
      }
    })
    // 获取shenpi详情
  @Effect() getapplydetail$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.APPLYDETAIL)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.applyDetail(auth.id, auth.token, auth.emp.teamId,info))
  .map(res => {
    console.log(res)
    if(res.success&&res.dataObject) {
      const data = {
        type: res.dataObject.type?res.dataObject.type:'',
        classify: res.dataObject.classify?res.dataObject.classify:'',
        startDate: res.dataObject.startDate?res.dataObject.startDate:'',
        endDate: res.dataObject.endDate?res.dataObject.endDate:'',
        days: res.dataObject.days?res.dataObject.days:'',
        initatorEmp: res.dataObject.initatorEmp?res.dataObject.initatorEmp:'',
        reason: res.dataObject.reason?res.dataObject.reason:'',
        step: res.dataObject.step?res.dataObject.step:'',
        attach:res.dataObject.attach?res.dataObject.attach:'',
        attachName:res.dataObject.attachName?res.dataObject.attachName:'',
        status:res.dataObject.status?res.dataObject.status:'',
        finishDate:res.dataObject.finishDate?res.dataObject.finishDate:'',
        surplusDays:res.dataObject.name?res.dataObject.name:'',
        id:res.dataObject.id?res.dataObject.id:'',
      }
      return new actions.getWorkDetailSuccessAction(data)
  }
  return new actions.getWorkDetailSuccessAction({})
  })
  // 修改yue计划
  @Effect() updateapply$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.UPDATEAPPLY)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.updateApply(auth.id, auth.token, auth.emp.teamId,auth.emp.id,info))
  .map(res => {
    console.log(res)
    if(res.success) {
      this.toast.message('已提交审核')
      return new actions.meetingUpdateSuccessAction({})
   }
  })
  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private app: App,
    private creatworkSerice: CreatworkServiceProvider,
    private toast: ToastSitutionProvider
  ) {}
}