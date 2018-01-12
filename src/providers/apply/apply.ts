import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApplyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApplyProvider {

  constructor(
    public http: Http,
    @Inject('BASE_URL') private config
  ) {
    console.log('Hello ApplyProvider Provider');
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
}
