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
    const uri=`${this.config.url}/app//plan_updatePlanWeek`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }

}
