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
        console.log(res)
        if(res.success) {
            return new actions.UserInfoSuccessAction(res.dataObject)
         }
    })
    // login
    @Effect() 
    login$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGIN)
    .map(toPayload)
    .switchMap((val: {phoneNum: string, password: string}) => {
        console.log(val.phoneNum, val.password)
       return this.service.login(val.phoneNum, val.password)})
    .map(res => {
        if(res.success) {

            this.appCtrl.getActiveNav().goToRoot({animate:true,direction:'forward'})
            localStorage.setItem('userId', res.dataObject.id)
           return new actions.LoginSuccessAction(res.dataObject)
        }else {
            this.toast.message(res.msg)
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
             this.appCtrl.getRootNav().push('LoginPage')
            return new actions.LogoutSucccessAction(res.dataObject)
     })

    @Effect()
    navigateHome$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.LOGIN_SUCCESS)
      .map((action)=> action.payload)
      .map(() => {
         // this.appCtrl.getRootNav().setRoot('WorkDeskPage')
          return new actions.AuthFailAction({
            msg: ''
          })
        })
    // getregistersign
    @Effect() 
    getsign$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.SIGN)
    .map(toPayload)
    .switchMap(val => this.service.getSign( val.type))
    .map((res) =>{
        console.log(res)
       if(res.success) {
           return new actions.SignSuccessAction({sign:res.dataObject})
       }
        })
   // 找回密码获取验证码
   @Effect() 
   getforgetcode$: Observable<Action> = this.actions$
   .ofType(actions.ActionTypes.FORGET_PASSWORD_CODE)
   .map(toPayload)
   .withLatestFrom(this.store$.select(store=>store.auth.auth))
   .switchMap(([info,auth]) => this.service.getForgetCode(info.phoneNum,auth.sign))
   .map((res) =>{
       console.log(res)
      if(res.success) {
          return new actions.ForgetPasswordCodeSuccessAction({code:res.dataObject})
      }
       })
    // getregistercode
    //   @Effect() 
    //   getregistercode$: Observable<Action> = this.actions$
    //   .ofType(actions.ActionTypes.SIGN_SUCCESS)
    //   .map(toPayload)
    //   .switchMap(res => {
    //       console.log(res)
    //       if(res.sign_type === '1') {
    //         return this.service.getRegisterCode(res.phoneNum, res.sign)
    //       }
    //       if(res.sign_type === '2') {
    //         return this.service.getForgetCode(res.phoneNum, res.sign)
    //       }
    //   })
    //   .map((res) => {
    //       console.log(res)
    //       if(res.success) {
    //         return new actions.RegisterVercodeSuccessAction({})
    //       }else{
    //         return new actions.AuthFailAction({
    //             msg: res.msg
    //           })
    //       }
    //   })
    // checkregistercode
    @Effect() 
    checkregistercode$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.CHECKREGCODE)
    .map(toPayload)
    .switchMap((res) => {
        console.log(res)
        if(res.type=='1') {
            return this.service.checkRegisterCode(res.phoneNum,res.code)
        }
        if(res.type=='2') {
            return this.service.checkForgetCode(res.phoneNum,res.code)
        }
       })
    .map(res => {
      if(res.success) {
          this.service.setStep();
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
      .switchMap(([password, auth]) => this.service.register(auth.userName, auth.code, auth.sign, password.password))
      .map(res => {
          console.log(res)
        if(res.success) {
            return new actions.RegisterSuccessAction({})
        }else{
            return new actions.AuthFailAction({
                msg: res.msg
              })
        }
      })

      @Effect()
      registerAndHome$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.REGISTER_SUCCESS)
        .map(() => this.appCtrl.getRootNav().push('LoginPage'))
   
    // 找回密码    
    @Effect()
    forgetPassword$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.FORGET_PASSWORD)
    .map(toPayload)
    .withLatestFrom(this.store$.select(store => store.auth.auth))
    .switchMap(([password, auth]) => this.service.resetPassword(auth.userName, auth.code, auth.sign, password.password))
    .map(res => {
        console.log(res)
      if(res.success) {
        this.appCtrl.getRootNav().push('LoginPage')
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
         console.log(res)
         if(res.success) {
            return new actions.ChangePasswordSuccessAction(true)
         }else {
            return new actions.AuthFailAction({
                msg: res.msg
              })
         }})
         
     

      @Effect()
      changeAndHome$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.CHANGE_PASSWORD_SUCCESS)
        .map(() => this.appCtrl.getRootNav().push('WorkUsercenterPage'))
   
    
    // 修改auth项
    @Effect()
    change$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.CHANGE)
    .map(toPayload)
    .withLatestFrom(this.store$.select(store => store.auth.auth))
    .switchMap(([info, auth]) => {
        return this.service.changeUserInfo({userId: auth.id, token: auth.token, ...info})})
    .map(res => {
        if(res.success) {
            return new actions.ChangeSuccessAction(res.dataObject)
        }else {
            return new actions.AuthFailAction({
                msg: res.msg
            })
        }
    })
   
    // @Effect()
    // ChangeAndHome$: Observable<Action> = this.actions$
    //   .ofType(actions.ActionTypes.CHANGE_SUCCESS)
    //   .map(_ =>{
    //      this.appCtrl.getActiveNavs()[this.appCtrl.getActiveNavs().length-1].pop()
    //      return new actions.AuthFailAction({
    //         msg: ''
    //     })
    //     } 
    //     )
   //.do(() => console.log(this.appCtrl.getActiveNavs()[this.appCtrl.getActiveNavs().length-1]))
    constructor(
        private actions$: Actions,
        public appCtrl: App,
        private service: AuthProvider,
        private toast: ToastSitutionProvider,
        private store$: Store<fromRoot.State>
    ) {}
}
