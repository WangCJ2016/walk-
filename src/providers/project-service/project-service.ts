import { Injectable,Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProjectServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjectServiceProvider {

  constructor(public http: Http,@Inject('BASE_URL') private config) {
    console.log('Hello ProjectServiceProvider Provider');
  }
  proDetail(userId,token,teamId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      pageSize:12,
      ...info
    }
    const uri = `${this.config.url}/app/project_projectDetail`
    return this.http.get(uri, {params: params})
      .map(res => res.json())
  }
  propeo(userId,token,teamId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      ...info
    }
    const uri = `${this.config.url}/app/project_projectDynamic`
    return this.http.get(uri, {params: params})
      .map(res => res.json())
  }
  proThingList(userId,token,teamId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      pageSize:10,
      ...info
    }
    const uri = `${this.config.url}/app/thing_projectThingList`
    return this.http.get(uri, {params: params})
      .map(res => res.json())
  }
  proMembers(userId,token,teamId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      ...info
    }
    const uri = `${this.config.url}/app/project_projectEmpList`
    return this.http.get(uri, {params: params})
      .map(res => res.json())
  }
  currProjectTreeMenu(userId,token,teamId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      ...info
    }
    const uri = `${this.config.url}/app/project_currProjectTreeMenu`
    return this.http.get(uri, {params: params})
      .map(res => res.json())
  }
}
