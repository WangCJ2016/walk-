import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AttenceServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AttenceServiceProvider {

  constructor(
    public http: Http,
    @Inject('BASE_URL') private config
    ) {
    console.log('Hello AttenceServiceProvider Provider');
  }
  // 显示签到或签退
  getAttence(userId:string,token:string,teamId:string,deptId:string,empId:string) {
    const uri = `${this.config.url}/app/attendanceEmp_clockInView`
    return this.http.get(uri, {params: {userId:userId,token:token,teamId:teamId,deptId:deptId,empId:empId}})
      .map(res => res.json())
  }
  // 打卡
  sign(userId:string,token:string,teamId:string,deptId:string,empId:string,info:any) {
    const uri = `${this.config.url}/app/attendanceEmp_clockIn`
    const params = {userId:userId,token:token,teamId:teamId,deptId:deptId,empId:empId,...info,clockType:2}
    return this.http.get(uri, {params: params})
    .map(res => {
      return {type:info.type,res: res.json()}
    })
  }
  // 考勤列表
  attenceRecord(userId:string,token:string,teamId:string,deptId:string,empId:string,time:string) {
    const uri = `${this.config.url}/app/attendanceEmp_attendanceEmpRecordList`
    const params = {userId:userId,token:token,teamId:teamId,deptId:deptId,empId:empId,attendanceDate:time}
    return this.http.get(uri, {params: params})
    .map(res => res.json())
  }
  // 考勤统计在岗情况
  attenceStat(userId:string,token:string,teamId:string,time:string) {
    const uri = `${this.config.url}/app/attendanceEmp_attendanceEmpStat`
    const params = {userId:userId,token:token,teamId:teamId,attendanceDate:time}
    return this.http.get(uri, {params: params})
    .map(res => res.json())
  }
}
