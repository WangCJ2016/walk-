import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ContactServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactServiceProvider {

  constructor(
    public http: Http,
    @Inject('BASE_URL') private config) {
    console.log(this.config)
  }

  // 获取员工列表
  loadContacts(userId: string, token: string, teamId:string, letter?:string) {
    const params = letter?{userId: userId, token: token, teamId:teamId, letter:letter}:
                          {userId: userId, token: token, teamId:teamId}
    const uri = `${this.config.url}/app/emp_empList`
    return this.http.get(uri, {params: params})
             .map(res=>res.json())
  }
  // 获取员工详情
  empDetail(userId: string,token: string, teamId: string, empId: string) {
    const params = {userId: userId,token: token, teamId: teamId, empId: empId}
    const uri = `${this.config.url}/app/emp_empDetail`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
}
