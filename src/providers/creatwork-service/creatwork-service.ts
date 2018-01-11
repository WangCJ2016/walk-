import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CreatworkServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CreatworkServiceProvider {

  constructor(public http: Http, @Inject('BASE_URL') private config) {
    
  }
  // 添加周计划
  addPlanWeek(userId,token,teamId,deptId,empId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      deptId:deptId,
      empId:empId,
      ...info
    }
    const uri = `${this.config.url}/app/plan_addPlanWeek`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // 获取工作详情
  getWorkDetail(userId,token,teamId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      ...info
    }
    
    let uri = `${this.config.url}/app/plan_planWeekDetail`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // 修改计划
  update(userId,token,teamId,deptId,empId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      deptId:deptId,
      empId:empId,
      ...info
    }

    const uri=`${this.config.url}/app/plan_updatePlanWeek`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // 添加月计划
  addPlanMonth(userId,token,teamId,deptId,empId,info) {
    
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      deptId:deptId,
      empId:empId,
      ...info
    }
   
    const uri = `${this.config.url}/app/plan_addPlanMonth`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // 获取工作详情
  getMonthDetail(userId,token,teamId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      ...info
    }
    
    let uri = `${this.config.url}/app/plan_planMonthDetail`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // 修改计划
  updateY(userId,token,teamId,deptId,empId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      deptId:deptId,
      empId:empId,
      ...info
    }
    const uri=`${this.config.url}/app/plan_updatePlanMonth`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // 添加会议
  addMeeting(userId,token,teamId,deptId,empId,info) { 
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      deptId:deptId,
      empId:empId,
      ...info
    }
   
    const uri = `${this.config.url}/app/metting_addMetting`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // 获取会议内容
  getMeetingDetail(userId, token, teamId, info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      ...info
    }
    const uri=`${this.config.url}/app/metting_mettingDetail`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // 修改会议内容
  updateMeeting(userId,token,teamId,deptId,empId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      deptId:deptId,
      empId:empId,
      ...info
    }
    const uri=`${this.config.url}/app/metting_updateMetting`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // 审批创建
  addapply(userId,token,teamId,deptId,empId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      deptId:deptId,
      empId:empId,
      ...info
    }
    const uri=`${this.config.url}/app/apply_addApply`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // applyDetail
  applyDetail(userId,token,teamId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      ...info
    }
    const uri=`${this.config.url}/app/apply_applyDetail`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // 修改审批
  updateApply(userId,token,teamId,empId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      empId:empId,
      applyPerson: empId,
      ...info
    }
    const uri=`${this.config.url}/app/apply_updateApplyStatus`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // 审批列表
  applyList(userId,token,teamId,empId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      empId:empId,
      ...info,
      pageSize: 12
    }
    const uri=`${this.config.url}/app/apply_applyList`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // 审批流程图
  applyFlow(userId,token,teamId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      ...info,
    }
    const uri=`${this.config.url}/app/apply_applyFlowList`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // 审批汇总
  applyCollect(userId,token,teamId,empId) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      empId:empId
    }
    const uri=`${this.config.url}/app/thing_myInitCount`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // 事务list
  shiwuList(userId,token,teamId,empId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      empId:empId,
      ...info,
      pageSize: 12
    }
    const uri=`${this.config.url}/app/thing_thingList`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // 添加事务
  addShiwu(userId,token,teamId,deptId,empId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      deptId:deptId,
      empId:empId,
      ...info,
    }
    const uri=`${this.config.url}/app/thing_addThing`
    return this.http.get(uri, {params: params})
    .map(res=>({
      type: info.type,
      res: res.json()
    }))
  }
  // 获取shiwu内容
  getShiwuDetail(userId, token, teamId, info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      ...info
    }
    const uri=`${this.config.url}/app/thing_thingDetail`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  //shiwu update
  shiwuUpdate(userId,token,teamId,deptId,empId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      deptId:deptId,
      empId:empId,
      ...info,
    }
    const uri=`${this.config.url}/app/thing_updateThing`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // 子事务
  zishiwu(userId,token,teamId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      ...info,
    }
    const uri=`${this.config.url}/app/thing_sonThingList`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // 删除事务
  shiwuDel(userId,token,teamId,empId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      empId:empId,
      ...info,
    }
    const uri=`${this.config.url}/app/thing_deleteThing`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // 获取日期
  workPlate(userId,token,teamId,empId) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      empId:empId,
    }
    const uri=`${this.config.url}/app/thing_workPlate`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
   // 获取事务个数统计
   thingCount(userId,token,teamId,empId) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      empId:empId,
    }
    const uri=`${this.config.url}/app/thing_thingCount`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // 成果产出物
  requireList(userId,token,teamId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      ...info
    }
    const uri=`${this.config.url}/app/thing_resultsList`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  addRequire(userId,token,teamId,deptId,empId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      deptId:deptId,
      empId:empId,
      ...info
    }
    const uri=`${this.config.url}/app/thing_addResults`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  delRequire(userId,token,teamId,empId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      empId:empId,
      ...info
    }
    const uri=`${this.config.url}/app/thing_deleteResults`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  requireLink(userId,token,teamId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      ...info
    }
    const uri=`${this.config.url}/app/thing_fileUniteResults`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // 我发起的审批列表
  applyTimeCount(userId,token,teamId,empId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      empId:empId,
      ...info
    }
    const uri=`${this.config.url}/app/thing_myInitTimeCount`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  myInitTypeCount(userId,token,teamId,empId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      empId:empId,
      ...info
    }
    const uri=`${this.config.url}/app/thing_myInitTypeCount`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // 审批列表
  applySelectList(userId,token,teamId,empId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      empId:empId,
      pageSize:12,
      ...info
    }
    const uri=`${this.config.url}/app/thing_myInitList`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
}


