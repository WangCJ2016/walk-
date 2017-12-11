import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ChatServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatServiceProvider {

  constructor(
    public http: Http,
    @Inject('BASE_URL') private config
  ) {
    console.log('Hello ChatServiceProvider Provider');
  }
  sendChat(userId,token,teamId,deptId,empId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      deptId:deptId,
      empId:empId,
      ...info
    }
    console.log(params)
    const uri = `${this.config.url}/app/chat_addChatThing`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
  chatList(userId,token,teamId,info) {
    const params = {
      userId:userId,
      token:token,
      teamId:teamId,
      ...info
    }
    const uri = `${this.config.url}/app/chat_chatThingList`
    return this.http.get(uri, {params: params})
    .map(res=>res.json())
  }
}
