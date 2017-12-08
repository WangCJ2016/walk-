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
import { applyType, applyStatus} from '../utils'
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
  
    if(res.success) {
      this.app.getRootNav().push('PlanzDetailPage',{id:res.dataObject})
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
         // head:res.dataObject.mainPersonEmp.photo?res.dataObject.mainPersonEmp.photo:'',
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
      this.toast.message('已保存')
      this.app.getActiveNav().setPages([{page: 'WorkDeskPage'},{page:'MyWorkPage'}],{animate:true,direction:'back'})
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
    if(res.success) {
      this.app.getRootNav().push('PlanyDetailPage',{id:res.dataObject})
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
      this.toast.message('已保存')
      this.app.getActiveNav().setPages([{page: 'WorkDeskPage'},{page:'MyWorkPage'}],{animate:true,direction:'back'})
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
       this.app.getRootNav().push('MeetingDetailPage',{id:res.dataObject})
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
        initatorId:res.dataObject.initator?res.dataObject.initator:'',
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
   // 修改meeting
   @Effect() updatemeeting$: Observable<Action> = this.actions$
   .ofType(actions.ActionTypes.UPDATEMEETING)
   .map(toPayload)
   .withLatestFrom(this.store$.select(store=>store.auth.auth))
   .switchMap(([info,auth])=>this.creatworkSerice.updateMeeting(auth.id, auth.token, auth.emp.teamId, auth.emp.deptId,auth.emp.id,info))
   .map(res => {
     console.log(res)
     if(res.success) {
       this.toast.message('已保存')
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
        this.app.getRootNav().push('ShenpiDetailPage',{id:res.dataObject})
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
        applyEmp:res.dataObject.applyEmp?res.dataObject.applyEmp:'',
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
  // 修改shnepi
  @Effect() updateapply$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.UPDATEAPPLY)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.updateApply(auth.id, auth.token, auth.emp.teamId,auth.emp.id,info))
  .map(res => {
    console.log(res)
    if(res.success) {
      this.toast.message('已提交审核')
      return new actions.applyUpdateSuccessAction({})
   }
  })
  // shenpi列表
  @Effect() applylist$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.APPLYLIST)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.applyList(auth.id, auth.token, auth.emp.teamId,auth.emp.id,info))
  .map(res => {
    console.log(res)
    if(res.success) {
      const data = res.dataObject.result.map(apply => ({
        startDate:apply.apply.startDate,
        endDate:apply.apply.endDate,
        id:apply.apply.applyId,
        pageNo:res.dataObject.pageNo?res.dataObject.pageNo:0,
        type: apply.type,
        status:applyStatus(apply.apply.status),
        initatorEmp:apply.apply.initatorEmp,
        classify:applyType(apply.apply.type,apply.apply.classify)
      }))
      return new actions.applyListSuccessAction(data)
    }
  })
  // shenpi流程图
  @Effect() applyflow$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.APPLYFLOW)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.applyFlow(auth.id, auth.token, auth.emp.teamId,info))
  .map(res => {
    console.log(res)
    if(res.success) {
      const data = res.dataObject.map(apply => ({
         status:applyStatus(apply.status),
         emp:apply.emp,
         updateTime:apply.updateTime
      }))
      return new actions.applyFlowSuccessAction(data)
    }
  })
   // 事务list
   @Effect() shiwulist$: Observable<Action> = this.actions$
   .ofType(actions.ActionTypes.SHIWULIST)
   .map(toPayload)
   .withLatestFrom(this.store$.select(store=>store.auth.auth))
   .switchMap(([info,auth])=>this.creatworkSerice.shiwuList(auth.id, auth.token, auth.emp.teamId,auth.emp.id,info))
   .map(res => {
     console.log(res)
     if(res.success&&res.dataObject) {
       const data = {
         pageNo:res.dataObject.pageNo?res.dataObject.pageNo:0,
         totalPages: res.dataObject.totalPages,
         list: res.dataObject.result.map(res => ({
           id:res.id,
           initatorEmp:res.initatorEmp?res.initatorEmp:'',
           mainPersonEmp: res.mainPersonEmp?res.mainPersonEmp:'',
           name: res.name?res.name:'',
           type: res.type,
           shenpiType: applyType(res.type,res.classify),
           progress:res.progress?res.progress:0,
           surplusDays:res.surplusDays?res.surplusDays:0,
         }))
       }
       return new actions.shiwuListSuccessAction(data)
     }
     return new actions.shiwuListSuccessAction([])
   })
   // 添加事务
  @Effect() addshiwu$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.ADDSHIWU)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.addShiwu(auth.id, auth.token, auth.emp.teamId, auth.emp.deptId,auth.emp.id,info))
  .map(res => {
    console.log(res)
    if(res.res.success) {
      if(res.type===1) {
        this.app.getRootNav().push('ShiwuDetailPage',{type:'thingId',id:res.res.dataObject})
      }else {
        console.log(this.app.getRootNav())
        this.app.getRootNav().pop()
      }
      return new actions.addShiwuSuccessAction({})
    }
  })
  // 获取事务详情
  @Effect() getshiwudetail$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.SHIWUDETAIL)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.getShiwuDetail(auth.id, auth.token, auth.emp.teamId,info))
  .map(res => {
    console.log(res)
    if(res.success&&res.dataObject) {
      const data = {
        name: res.dataObject.name?res.dataObject.name:'',
        remark: res.dataObject.remark?res.dataObject.remark:'',
        initatorEmp: res.dataObject.initatorEmp?res.dataObject.initatorEmp:'',
        mainPersonEmp: res.dataObject.mainPersonEmp?res.dataObject.mainPersonEmp:'',
        startDate:res.dataObject.startDate?res.dataObject.startDate:'',
        endDate:res.dataObject.endDate?res.dataObject.endDate:'',
        attach:res.dataObject.attach?res.dataObject.attach:'',
        attachName:res.dataObject.attachName?res.dataObject.attachName:'',
        progress:res.dataObject.progress?res.dataObject.progress:'',
        status:res.dataObject.status?res.dataObject.status:'',
        finishDate:res.dataObject.finishDate?res.dataObject.finishDate:'',
        mainPersonId:res.dataObject.mainPerson?res.dataObject.mainPerson:'',
        initatorId:res.dataObject.initator?res.dataObject.initator:'',
        surplusDays:res.dataObject.name?res.dataObject.name:'',
      }
      return new actions.getWorkDetailSuccessAction(data)
  }
  return new actions.getWorkDetailSuccessAction({})
  })
  // 修改shiwu
  @Effect() updateshiwu$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.SHIWUUPDATE)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.shiwuUpdate(auth.id, auth.token, auth.emp.teamId,auth.emp.deptId,auth.emp.id,info))
  .map(res => {
    console.log(res)
    if(res.success) {
      this.toast.message('已保存')
      return new actions.shiwuUpdateSuccessAction({})
   }
  })
  // 获取子事务详情
  @Effect() getzishiwudetail$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.ZISHIWU)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.zishiwu(auth.id, auth.token, auth.emp.teamId,info))
  .map(res => {
    console.log(res)
    if(res.success&&res.dataObject) {
    
      const data = res.dataObject.map(apply=>({
        id: apply.id?apply.id:'',
        name: apply.name?apply.name:'',
        remark: apply.remark?apply.remark:'',
        progress:apply.progress?apply.progress:0,
        surplusDays:apply.surplusDays?apply.surplusDays:0,
        mainPersonEmp: apply.mainPersonEmp?apply.mainPersonEmp:''
      }))
      return new actions.zishiwuSuccessAction(data)
  }
  return new actions.zishiwuSuccessAction({})
  })
  // 删除事务
  @Effect() delshiwudetail$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.SHIWUDEL)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.shiwuDel(auth.id, auth.token, auth.emp.teamId,auth.emp.id,info))
  .map(res => {
    console.log(res)
    if(res.success&&res.dataObject) {
      return new actions.zishiwuDelSuccessAction({})
  }
  return new actions.zishiwuDelSuccessAction({})
  })
  // 获取日期
  @Effect() workplate$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.WORKPLATE)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.workPlate(auth.id, auth.token, auth.emp.teamId,auth.emp.id))
  .map(res => {
    console.log(res)
    if(res.success&&res.dataObject) {
      return new actions.workPlateSuccessAction(res.dataObject)
  }
  return new actions.workPlateSuccessAction({})
  })
  // 添加成果产出物
  @Effect() addrequire$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.ADDREQUIRE)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.addRequire(auth.id, auth.token, auth.emp.teamId, auth.emp.deptId,auth.emp.id,info))
  .map(res => {
    console.log(res)
    if(res.success) {
      return new actions.addRequireSuccessAction({})
   }
  })
  // 删除成果产出物
  @Effect() delrequire$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.DELREQUIRE)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.delRequire(auth.id, auth.token, auth.emp.teamId,auth.emp.id,info))
  .map(res => {
    console.log(res)
    if(res.success) {
      return new actions.delRequireSuccessAction({})
   }
  })
  // 成果产出物list
  @Effect() requireList$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.REQUIRELIST)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.requireList(auth.id, auth.token, auth.emp.teamId,info))
  .map(res => {
    console.log(res)
    if(res.success) {
      const data = res.dataObject.map(list=>({
        name: list.name,
        attach: list.attach?list.attach:'',
        attachName: list.attachName?list.attachName:'',
        id: list.id,
        updateTime: list.updateTime
      }))
      return new actions.requireListSuccessAction(data)
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