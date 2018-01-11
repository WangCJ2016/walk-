import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { Actions, Effect, toPayload } from '@ngrx/effects';
import { App } from 'ionic-angular';

import { ToastSitutionProvider} from '../providers'
import { AuthProvider} from '../providers'
import * as actions from '../actions/auth.action'
import { Store } from '@ngrx/store'
import * as fromRoot from '../reducer'


@Injectable()
export class AuthEffects {
     // authfail
     @Effect() 
     fail$: Observable<Action> = this.actions$
     .ofType(actions.ActionTypes.AUTH_FAIL)
     .map(toPayload)
     .map(res => {
         if(res.msg){
            this.toast.message(res.msg)
            return new actions.AuthFailSuccessAction({msg:res.msg})
         }
     })
    // userinfo
    @Effect() 
    userinfo$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.USERINFO)
    .map(toPayload)
    .switchMap(val => this.service.getUserInfo(val.userId))
    .map(res => {
        if(res.success) {
            const data = {
                cityId: res.dataObject.cityId,
                id: res.dataObject.id,
                name: res.dataObject.name,
                photo: res.dataObject.photo,
                provinceId: res.dataObject.provinceId,
                sex: res.dataObject.sex,
                token: res.dataObject.token,
                userName: res.dataObject.userName,
                emp:res.dataObject.emp?{
                    deptId: res.dataObject.emp.deptId,
                    id:res.dataObject.emp.id,
                    name: res.dataObject.emp.name,
                    photo: res.dataObject.emp.photo,
                    teamId:res.dataObject.emp.team.id,
                    team: {
                        id: res.dataObject.emp.team.id,
                        name: res.dataObject.emp.team.name,
                    }
                }:null
            }
            return new actions.UserInfoSuccessAction(data)
         }else{
             this.appCtrl.getActiveNav().push('LoginPage')
             return new actions.AuthFailAction({
                msg: res.msg
              })
         }
    })
    // login
    @Effect() 
    login$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGIN)
    .map(toPayload)
    .switchMap((val: {phoneNum: string, password: string}) => {
       return this.service.login(val.phoneNum, val.password)})
    .map(res => {
        if(res.success) { 
            this.appCtrl.getRootNav().goToRoot({animate:true,direction:'forward'})
            localStorage.setItem('userId', res.dataObject.id)
            const data = {
                cityId: res.dataObject.cityId,
                id: res.dataObject.id,
                name: res.dataObject.name,
                photo: res.dataObject.photo,
                provinceId: res.dataObject.provinceId,
                sex: res.dataObject.sex,
                token: res.dataObject.token,
                userName: res.dataObject.token,
                emp: res.dataObject.emp?{
                    deptId: res.dataObject.emp.deptId,
                    id:res.dataObject.emp.id,
                    name: res.dataObject.emp.name,
                    photo: res.dataObject.emp.photo,
                    teamId:res.dataObject.emp.team.id,
                    team: {
                        id: res.dataObject.emp.team.id,
                        name: res.dataObject.emp.team.name,
                    }
                }:null
            }
           return new actions.LoginSuccessAction(data)
        }else {
           
            return new actions.AuthFailAction({
                msg: res.msg
              })
        }
    })
     // loginout
     @Effect() 
     loginout$: Observable<Action> = this.actions$
     .ofType(actions.ActionTypes.LOGOUT)
     .map(toPayload)
     .map(res => {
             localStorage.removeItem('userId')
             this.appCtrl.getActiveNav().push('LoginPage')
            return new actions.LogoutSucccessAction(res.dataObject)
     })

    
    // getregistersign
    @Effect() 
    getsign$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.SIGN)
    .map(toPayload)
    .switchMap(val => this.service.getSign( val.type))
    .map((res) =>{
       if(res.success) {
           return new actions.SignSuccessAction({sign:res.dataObject})
       }
        })
   
    // getregistercode
      @Effect() 
      getregistercode$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.REGISTER_VERCODE)
      .map(toPayload)
      .withLatestFrom(this.store$.select(store=>store.auth.auth))
      .switchMap(([info,auth]) => {
            return this.service.getRegisterCode(info.phoneNum, auth.sign)
      })
      .map((res) => {
          
          if(res.success) {
              this.toast.message('发送成功')
            return new actions.RegisterVercodeSuccessAction({code: res.dataObject,countIf: true})
          }else{
            return new actions.AuthFailAction({
                msg: res.msg
              })
          }
      })
    // checkregistercode
    @Effect() 
    checkregistercode$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.CHECKREGCODE)
    .map(toPayload)
    .withLatestFrom(this.store$.select(store=>store.auth.auth))
    .switchMap(([info,auth]) => {
            return this.service.checkRegisterCode(info.phoneNum,auth.code,auth.sign)
       })
    .map(res => {
      if(res.success) {
          this.service.setStep('two');
          return new actions.CheckRegCodeSuccessAction({})
      }else{
          return new actions.AuthFailAction({
              msg: res.msg
            })
      }
    })
    // register
      @Effect()
      register$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.REGISTER)
      .map(toPayload)
      .withLatestFrom(this.store$.select(store => store.auth.auth))
      .switchMap(([info, auth]) => {
         
          return this.service.register(info.phoneNum, auth.code, auth.sign, info.password)})
      .map(res => {
         
        if(res.success) {
            this.toast.message('注册成功')
            this.appCtrl.getActiveNav().push('LoginPage')
            return new actions.RegisterSuccessAction({})
        }else{
            this.toast.message(res.msg)
            return new actions.AuthFailAction({
                msg: res.msg
              })
        }
      })

      @Effect()
      registerAndHome$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.REGISTER_SUCCESS)
        .map(() => this.appCtrl.getRootNav().push('LoginPage'))
   // 找回密码获取验证码
   @Effect() 
   getforgetcode$: Observable<Action> = this.actions$
   .ofType(actions.ActionTypes.FORGET_PASSWORD_CODE)
   .map(toPayload)
   .withLatestFrom(this.store$.select(store=>store.auth.auth))
   .switchMap(([info,auth]) => this.service.getForgetCode(info.phoneNum,auth.sign))
   .map((res) =>{
      
      if(res.success) {
        this.toast.message('发送成功')
          return new actions.ForgetPasswordCodeSuccessAction({code:res.dataObject,countIf: true})
      }else{
        return new actions.AuthFailAction({
            msg: res.msg
          })
      }
       })
    //找回密码验证码验证
    @Effect() 
    checkforgetcode$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.CHECKFORGETCODE)
    .map(toPayload)
    .withLatestFrom(this.store$.select(store=>store.auth.auth))
    .switchMap(([info,auth]) => {
            return this.service.checkForgetCode(info.phoneNum,auth.code,auth.sign)
       })
    .map(res => {
      if(res.success) {
          this.service.setStep('two');
          return new actions.checkForgetPasswordCodeSuccessAction({})
      }else{
          return new actions.AuthFailAction({
              msg: res.msg
            })
      }
    })
    // 找回密码    
    @Effect()
    forgetPassword$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.FORGET_PASSWORD)
    .map(toPayload)
    .withLatestFrom(this.store$.select(store => store.auth.auth))
    .switchMap(([info, auth]) => this.service.resetPassword(info.phoneNum, auth.code, auth.sign, info.password))
    .map(res => {
       
      if(res.success) {
        this.service.setStep('one');
        this.appCtrl.getActiveNav().push('LoginPage')
          return new actions.ForgetPasswordSuccessAction({ })
      }else{
          return new actions.AuthFailAction({
              msg: res.msg
            })
      }
    })
    
   
    
      // 修改密码
      @Effect()
      changePassword$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.CHANGE_PASSWORD)
      .map(toPayload)
      .withLatestFrom(this.store$.select(store => store.auth.auth))
      .switchMap(([o,auth]) => this.service.changePassword(auth.id, auth.token, o.oldpassword, o.newpassword))
      .map(res => {
    
         if(res.success) {
             this.appCtrl.getActiveNav().push('LoginPage')
             localStorage.removeItem('userId')
             this.toast.message('密码修改成功，请重新登录')
            return new actions.ChangePasswordSuccessAction(true)
         }else {
            return new actions.AuthFailAction({
                msg: res.msg
              })
         }})
         
   
    
    // 修改auth项
    @Effect()
    change$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.CHANGE)
    .map(toPayload)
    .withLatestFrom(this.store$.select(store => store.auth.auth))
    .switchMap(([info, auth]) => {
        return this.service.changeUserInfo(auth.id, auth.token, info)})
    .map(res => {
      
        if(res.res.success) {
            if(res.name||res.sex){
                this.appCtrl.getActiveNav().pop()
            }
            this.toast.message('保存成功')
            return new actions.ChangeSuccessAction(res.res.dataObject)
        }else {
            this.toast.message(res.msg)
            return new actions.AuthFailAction({
                msg: res.msg
            })
        }
    })
   
    constructor(
        private actions$: Actions,
        public appCtrl: App,
        private service: AuthProvider,
        private toast: ToastSitutionProvider,
        private store$: Store<fromRoot.State>
    ) {}
}
