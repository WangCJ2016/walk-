import { Injectable,Inject } from '@angular/core';
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
  @Effect() error$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.ERROR)
  .map(res => {
    this.app.getActiveNav().push('LoginPage')
    this.toast.message(this.msg.token)
    return new actions.ErrorSuccessAction({})
  })
 
  // 创建周计划
  @Effect() creatplanez$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.PLANZSUBMIT)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.addPlanWeek(auth.id, auth.token, auth.emp.teamId, auth.emp.deptId,auth.emp.id,info))
  .map(res => {  
    if(res.success) {
      this.app.getRootNav().push('PlanzDetailPage',{id:res.dataObject})
      return new actions.planzsubmitSuccessAction({})
  }else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
  })
  // 获取zhou工作详情
  @Effect() getworkdetail$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.GETWORKDETAIL)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.getWorkDetail(auth.id, auth.token, auth.emp.teamId,info))
  .map(res => {
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
  else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
  })

  // 修改zhou计划
  @Effect() updateplanez$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.UPDATE)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.update(auth.id, auth.token, auth.emp.teamId, auth.emp.deptId,auth.emp.id,info))
  .map(res => {
    if(res.success) {
      this.toast.message('已保存')
      //this.app.getActiveNav().setPages([{page: 'WorkDeskPage'},{page:'MyWorkPage'}],{animate:true,direction:'back'})
      return new actions.updateSuccessAction({})
   }else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
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
    }else if(res.msgCode=='-1'){
      return new actions.ErrorAction({})
    }
  })
  // 获取zhou工作详情
  @Effect() getworkydetail$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.GETYDETAIL)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.getMonthDetail(auth.id, auth.token, auth.emp.teamId,info))
  .map(res => {
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
          head:res.dataObject.mainPersonEmp&&res.dataObject.mainPersonEmp.photo?res.dataObject.mainPersonEmp.photo:'',
        },
        surplusDays:res.dataObject.name?res.dataObject.name:'',
      }
      return new actions.getWorkDetailSuccessAction(data)
  }
  else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
  })
  // 修改yue计划
  @Effect() updateplaney$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.UPDATEY)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.updateY(auth.id, auth.token, auth.emp.teamId, auth.emp.deptId,auth.emp.id,info))
  .map(res => {
    if(res.success) {
      this.toast.message('已保存')
     // this.app.getActiveNav().setPages([{page: 'WorkDeskPage'},{page:'MyWorkPage'}],{animate:true,direction:'back'})
      return new actions.updateYSuccessAction({})
   }else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
  })
   // 创建会议
   @Effect() addmeeting$: Observable<Action> = this.actions$
   .ofType(actions.ActionTypes.ADDMEETING)
   .map(toPayload)
   .withLatestFrom(this.store$.select(store=>store.auth.auth))
   .switchMap(([info,auth])=>this.creatworkSerice.addMeeting(auth.id, auth.token, auth.emp.teamId, auth.emp.deptId,auth.emp.id,info))
   .map(res => {
     if(res.success) {
       this.app.getRootNav().push('MeetingDetailPage',{id:res.dataObject})
       return new actions.addMeetingSuccessAction({})
     }else if(res.msgCode=='-1'){
      return new actions.ErrorAction({})
    }
   })
   // 获取会议详情
  @Effect() getmeetingdetail$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.MEETINGDETAIL)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.getMeetingDetail(auth.id, auth.token, auth.emp.teamId,info))
  .map(res => {
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
  else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
  })
   // 修改meeting
   @Effect() updatemeeting$: Observable<Action> = this.actions$
   .ofType(actions.ActionTypes.UPDATEMEETING)
   .map(toPayload)
   .withLatestFrom(this.store$.select(store=>store.auth.auth))
   .switchMap(([info,auth])=>this.creatworkSerice.updateMeeting(auth.id, auth.token, auth.emp.teamId, auth.emp.deptId,auth.emp.id,info))
   .map(res => {

     if(res.success) {
       this.toast.message('已保存')
       return new actions.meetingUpdateSuccessAction({})
    }else if(res.msgCode=='-1'){
      return new actions.ErrorAction({})
    }
   })
    // 创建shenpi
    @Effect() addapply$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADDAPPLY)
    .map(toPayload)
    .withLatestFrom(this.store$.select(store=>store.auth.auth))
    .switchMap(([info,auth])=>this.creatworkSerice.addapply(auth.id, auth.token, auth.emp.teamId, auth.emp.deptId,auth.emp.id,info))
    .map(res => {
      if(res.success) {
        this.app.getActiveNav().push('ShenpiDetailPage',{id:res.dataObject})
        return new actions.addapplySuccessAction({})
      }else if(res.msgCode=='-1'){
        return new actions.ErrorAction({})
      }
    })
    // 获取shenpi详情
  @Effect() getapplydetail$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.APPLYDETAIL)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.applyDetail(auth.id, auth.token, auth.emp.teamId,info))
  .map(res => {
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
  else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
  })
  // 修改shnepi
  @Effect() updateapply$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.UPDATEAPPLY)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.updateApply(auth.id, auth.token, auth.emp.teamId,auth.emp.id,info))
  .map(res => {
    if(res.success) {
      this.toast.message('已提交审核')
      return new actions.applyUpdateSuccessAction({})
   }else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
  })
  // shenpi列表
  @Effect() applylist$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.APPLYLIST)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.applyList(auth.id, auth.token, auth.emp.teamId,auth.emp.id,info))
  .map(res => {
    if(res.success) {
      const data = res.dataObject.result.map(item => {
        if(item.apply){
          return ({
            startDate:item.apply.startDate,
            endDate:item.apply.endDate,
            id:item.applyId,
            pageNo:res.dataObject.pageNo?res.dataObject.pageNo:0,
            totalPages:res.dataObject.totalPages,
            type: item.type,
            status:applyStatus(item.apply.status),
            initatorEmp:item.apply.initatorEmp,
            classify:applyType(item.apply.type,item.apply.classify)
          })
        }
      }).filter(item=>item!=undefined)
      return new actions.applyListSuccessAction(data)
    }else if(res.msgCode=='-1'){
      return new actions.ErrorAction({})
    }
  })
  // shenpi流程图
  @Effect() applyflow$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.APPLYFLOW)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.applyFlow(auth.id, auth.token, auth.emp.teamId,info))
  .map(res => {
    if(res.success) {
      const data = res.dataObject.map(apply => ({
         status:applyStatus(apply.status),
         emp:apply.emp,
         updateTime:apply.updateTime
      }))
      return new actions.applyFlowSuccessAction(data)
    }else if(res.msgCode=='-1'){
      return new actions.ErrorAction({})
    }
  })
  // shenpi汇总
  @Effect() applyCollect$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.APPLYCOLLECT)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.applyCollect(auth.id, auth.token, auth.emp.teamId,auth.emp.id))
  .map(res => {
    if(res.success) {
      return new actions.applyCollectSuccessAction(res.dataObject)
    }else if(res.msgCode=='-1'){
      return new actions.ErrorAction({})
    }
  })
   // 事务list
   @Effect() shiwulist$: Observable<Action> = this.actions$
   .ofType(actions.ActionTypes.SHIWULIST)
   .map(toPayload)
   .withLatestFrom(this.store$.select(store=>store.auth.auth))
   .switchMap(([info,auth])=>this.creatworkSerice.shiwuList(auth.id, auth.token, auth.emp.teamId,auth.emp.id,info))
   .map(res => {

     if(res.success&&res.dataObject) {
       const data = {
         pageNo:res.dataObject.pageNo?res.dataObject.pageNo:0,
         records: res.dataObject.records,
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
     else if(res.msgCode=='-1'){
      return new actions.ErrorAction({})
    }
   })
   // 添加事务
  @Effect() addshiwu$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.ADDSHIWU)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.addShiwu(auth.id, auth.token, auth.emp.teamId, auth.emp.deptId,auth.emp.id,info))
  .map(res => {
    if(res.res.success) {
      if(res.type===1) {
      
        this.app.getRootNav().push('ShiwuDetailPage',{type:'thingId',id:res.res.dataObject})
        // this.app.getActiveNav().remove(0,1)
      }
      return new actions.addShiwuSuccessAction({})
    }else if(res.res.msgCode=='-1'){
      return new actions.ErrorAction({})
    }
  })
  // 获取事务详情
  @Effect() getshiwudetail$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.SHIWUDETAIL)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.getShiwuDetail(auth.id, auth.token, auth.emp.teamId,info))
  .map(res => {
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
  else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
  })
  // 修改shiwu
  @Effect() updateshiwu$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.SHIWUUPDATE)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.shiwuUpdate(auth.id, auth.token, auth.emp.teamId,auth.emp.deptId,auth.emp.id,info))
  .map(res => {
    if(res.success) {
      this.toast.message('已保存')
      return new actions.shiwuUpdateSuccessAction({})
   }else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
  })
  // 获取子事务详情
  @Effect() getzishiwudetail$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.ZISHIWU)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.zishiwu(auth.id, auth.token, auth.emp.teamId,info))
  .map(res => {
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
  else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
  })
  // 删除事务
  @Effect() delshiwudetail$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.SHIWUDEL)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.shiwuDel(auth.id, auth.token, auth.emp.teamId,auth.emp.id,info))
  .map(res => {
    if(res.success&&res.dataObject) {
      return new actions.zishiwuDelSuccessAction({})
  }
  else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
  })
  // 获取日期
  @Effect() workplate$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.WORKPLATE)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.workPlate(auth.id, auth.token, auth.emp.teamId,auth.emp.id))
  .map(res => {
    if(res.success&&res.dataObject) {
      return new actions.workPlateSuccessAction(res.dataObject)
  }
  else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
  })
  // 获取事务个数是统计
  @Effect() thingCount$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.THIINGCOUND)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.thingCount(auth.id, auth.token, auth.emp.teamId,auth.emp.id))
  .map(res => {
    if(res.success&&res.dataObject) {
      return new actions.thingCountSuccessAction(res.dataObject)
  }else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
  
  })
  // 添加成果产出物
  @Effect() addrequire$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.ADDREQUIRE)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.addRequire(auth.id, auth.token, auth.emp.teamId, auth.emp.deptId,auth.emp.id,info))
  .map(res => {
    if(res.success) {
      const data = {
        name: res.dataObject.name,
        id: res.dataObject.id
      }
      return new actions.addRequireSuccessAction([data])
   }else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
  })
  // 删除成果产出物
  @Effect() delrequire$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.DELREQUIRE)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.delRequire(auth.id, auth.token, auth.emp.teamId,auth.emp.id,info))
  .map(res => {
    if(res.success) {
      return new actions.delRequireSuccessAction({})
   }else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
  })
  // 成果产出物list
  @Effect() requireList$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.REQUIRELIST)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.requireList(auth.id, auth.token, auth.emp.teamId,info))
  .map(res => {
    if(res.success) {
      const data = res.dataObject.map(list=>({
        name: list.name,
        attach: list.attach?list.attach:'',
        attachName: list.attachName?list.attachName:'',
        id: list.id,
        updateTime: list.updateTime
      }))
      return new actions.requireListSuccessAction(data)
   }else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
  })
  // 文档关联事务成果产
  @Effect() requireLink$: Observable<Action> = this.actions$
  .ofType(actions.ActionTypes.REQUIRELINK)
  .map(toPayload)
  .withLatestFrom(this.store$.select(store=>store.auth.auth))
  .switchMap(([info,auth])=>this.creatworkSerice.requireLink(auth.id, auth.token, auth.emp.teamId,info))
  .map(res => {
    if(res.success) {
      return new actions.requireLinkSuccessAction({})
   }else if(res.msgCode=='-1'){
    return new actions.ErrorAction({})
  }
  })
   // 我发起的审批列表
   @Effect() applytimeCount$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.APPLYTIMECOUNT)
    .map(toPayload)
    .withLatestFrom(this.store$.select(store=>store.auth.auth))
    .switchMap(([info,auth])=>this.creatworkSerice.applyTimeCount(auth.id, auth.token, auth.emp.teamId,auth.emp.id,info))
    .map(res => {

      if(res.success) {
        return new actions.applyTimeCountSuccessAction(res.dataObject)
    }else if(res.msgCode=='-1'){
      return new actions.ErrorAction({})
    }
  })
  @Effect() applytypeCount$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.THINGTYPECOUNT)
    .map(toPayload)
    .withLatestFrom(this.store$.select(store=>store.auth.auth))
    .switchMap(([info,auth])=>this.creatworkSerice.myInitTypeCount(auth.id, auth.token, auth.emp.teamId,auth.emp.id,info))
    .map(res => {

      if(res.success) {
        return new actions.thingTypeCountSuccessAction(res.dataObject)
    }else if(res.msgCode=='-1'){
      return new actions.ErrorAction({})
    }
  })
  // 审批列表
  @Effect() applySelectList$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.APPLYSELECTLIST)
    .map(toPayload)
    .withLatestFrom(this.store$.select(store=>store.auth.auth))
    .switchMap(([info,auth])=>this.creatworkSerice.applySelectList(auth.id, auth.token, auth.emp.teamId,auth.emp.id,info))
    .map(res => {

      if(res.success) {
        return new actions.applySelectListSuccessAction(res.dataObject)
    }else if(res.msgCode=='-1'){
      return new actions.ErrorAction({})
    }
  })
  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private app: App,
    private creatworkSerice: CreatworkServiceProvider,
    private toast: ToastSitutionProvider,
    @Inject('MSG') private msg
  ) {}
}