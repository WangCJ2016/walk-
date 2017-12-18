import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WorkhomeServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WorkhomeServiceProvider {

  constructor(public http: Http,
    @Inject('BASE_URL') private config) {
    console.log('Hello WorkhomeServiceProvider Provider');
  }
  // getList
  getList(userId,token,teamId,empId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      empId:empId,
      pageSize: 15,
      ...info,
    }
    const uri=`${this.config.url}/app/chat_noticeIndex`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  // addgroup
  addGroup(userId,token,teamId,deptId,empId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      deptId:deptId,
      empId:empId,
      ...info,
    }
    const uri=`${this.config.url}/app/chat_addGroup`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  noticeList(userId,token,teamId,empId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      empId:empId,
      ...info,
    }
    const uri=`${this.config.url}/app/notice_noticeList`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  noticeDetail(userId,token,teamId,empId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      empId:empId,
      ...info,
    }
    const uri=`${this.config.url}/app/notice_noticeDetail`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
}
