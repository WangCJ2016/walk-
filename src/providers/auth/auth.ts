import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { AuthInfo } from '../../domain'

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  step1 = new BehaviorSubject<string>('one')
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  });
  constructor(public http: Http, @Inject('BASE_URL') private config) {
      console.log(this.config)
  }
  // 登录
  login(phoneNum: string, password: string) {
    alert(5)
    const uri = `${this.config.url}/app/user_login`;
    return this.http.get(uri, {params: {'userName': phoneNum, 'password': password}})
      .map(res => {
        alert(3)
        return res.json()
      })
  }
  // 注册获取sign
  getSign(phoneNum: string, type: string) {
    const url_sign = `${this.config.url}/app/user_getSmsSign`
    return this.http.get(url_sign, {params:{type: type}})
    .map(res => {
      return {
        phoneNum: phoneNum,
        sign_type: type,
        res: res.json()
      }
    })
  }
  // 注册验证码
  getRegisterCode(phoneNum: string,sign: string) {
    const url_code = `${this.config.url}/app/user_regGetVerifyCode`
    return this.http.get(url_code, {params:{userName: phoneNum, sign: sign}})
      .map(res =>res.json())
  }
  // 注册时短信验证码校验
  checkRegisterCode(phoneNum: string, code: string) {
    console.log(phoneNum, code)
    const url = `${this.config.url}/app/user_checkRegCode`
    return this.http.get(url, {params: {userName: phoneNum, code: code}})
    .map(res => res.json())
  }
  // 注册
  register(phoneNum: string, verCode: string, sign: string, passowrd: string) {
    const uri = `${this.config.url}/app/user_reg`
    return this.http.get(uri, {params: {userName: phoneNum, code: verCode, sign: sign, password: passowrd}})
    .map(res => res.json())
  }
  // 找回密码获取验证码
  getForgetCode(phoneNum: string,sign: string) {
    const url_code = `${this.config.url}/app/user_resetPasswordGetVerifyCode`
    return this.http.get(url_code, {params:{userName: phoneNum, sign: sign}})
      .map(res =>res.json())
  }
  // 找回密码获取验证码
  checkForgetCode(phoneNum: string, code: string) {
    console.log(phoneNum, code)
    const url = `${this.config.url}/app/user_checkResetPasswordCode`
    return this.http.get(url, {params: {userName: phoneNum, code: code}})
    .map(res => res.json())
  }
  // 用户找回密码
  resetPassword(phoneNum: string, verCode: string, sign: string, passowrd: string) {
    const uri = `${this.config.url}/app/user_resetPassword`
    return this.http.get(uri, {params: {userName: phoneNum, code: verCode, sign: sign, password: passowrd}})
    .map(res => res.json())
  }
  // 修改用户信息
  changeUserInfo(userInfo: AuthInfo) {
    const uri = `${this.config.url}/app/user_updateUserInfo`
    return this.http.get(uri, {params: userInfo})
      .map(res => res.json())
  }
  // 获取系统设置区域列表
  sysRegionList(id: string) {
    const parentId = parseInt(id)>0?id:1
    const uri = `${this.config.url}/app/system_sysRegionList`
    return this.http.get(uri, {params: {parentId:parentId}})
      .map(res => res.json())
  }
  getStep() {
    return this.step1.asObservable().startWith('')
  }
 
  setStep() {
    return this.step1.next('two')
  }
}
