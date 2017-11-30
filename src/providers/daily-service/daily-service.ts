import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DailyServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DailyServiceProvider {

  constructor(public http: Http, @Inject('BASE_URL') private config) {
    console.log('Hello DailyServiceProvider Provider');
  }
  addDaily(userId,token,teamId,deptId,empId,contents) {
    const params = {userId: userId,token: token, teamId: teamId, empId: empId,deptId: deptId,contents: contents}
    const uri = `${this.config.url}/app/daily_addDaily`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  dailyStat(userId,token,teamId,submitDate) {
    const params = {userId: userId,token: token, teamId: teamId,submitDate: submitDate}
    const uri = `${this.config.url}/app/daily_dailyStat`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  dailyDetail(userId,token,teamId,deptId,empId,empId1,submitDate) {
    const params = {
      userId: userId,
      token: token, 
      teamId: teamId,
      deptId:deptId,
      empId:empId,
      empId1:empId1,
      submitDate: submitDate}
    const uri = `${this.config.url}/app/daily_dailyDetail`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
}
