import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the TeamServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TeamServiceProvider {

  constructor(
    public http: Http,
    @Inject('BASE_URL') private config
  ) {

  }
  // 获取团队模块
  getTeamlist(userId:string, token:string) {
    const uri = `${this.config.url}/app/team_joinTeamList`
    return this.http.get(uri, {params: {userId: userId, token: token}})
      .map(res => res.json())
  }
  // 设置默认团队
  setDefaultTeam(userId: string, token: string, empId: string) {
    const uri = `${this.config.url}/app/team_setDefault`
    return this.http.get(uri, {params: {userId: userId, token: token, empId: empId}})
      .map(res => res.json())
  }
}
