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
    console.log('Hello CreatworkServiceProvider Provider');
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
    .map(res=>{
     return JSON.stringify({
        type: info.type,
        res: res.json()
      })
     })
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
    console.log(JSON.stringify(params))
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
    console.log(JSON.stringify(params))
    const uri = `${this.config.url}/app/plan_addPlanMonth`
    return this.http.get(uri, {params: params})
    .map(res=>{
     return JSON.stringify({
        type: info.type,
        res: res.json()
      })
     })
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
    console.log(JSON.stringify(params))
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
      ...info
    }
    const uri=`${this.config.url}/app/apply_updateApplyStatus`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
}
