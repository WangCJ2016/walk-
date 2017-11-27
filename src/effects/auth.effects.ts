import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { App } from 'ionic-angular';
import {of} from 'rxjs/observable/of';

import { AuthProvider} from '../providers'
import * as actions from '../actions/auth.action'
import { Store } from '@ngrx/store'
import * as fromRoot from '../reducer'


@Injectable()
export class AuthEffects {
    // login
    @Effect() 
    login$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGIN)
    .map(toPayload)
    .switchMap((val: {phoneNum: string, password: string}) => this.service.login(val.phoneNum, val.password))
    .map(res => {
        console.log(res)
        if(res.success) {
            const obj = {
                userName: res.dataObject.userName,
                name: res.dataObject.name,
                sex: res.dataObject.sex === 1?'男':'女',
                token: res.dataObject.token
            }
           return new actions.LoginSuccessAction(obj)
        }else {
            return new actions.AuthFailAction({
                msg: res.msg
              })
        }})
    
    @Effect()
    navigateHome$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.LOGIN_SUCCESS)
      .map((action)=> action.payload)
      .do(() => this.appCtrl.getRootNav().push('WorkUsercenterPage'))
    // getregistersign
    @Effect() 
    getsign$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.SIGN)
    .map(toPayload)
    .switchMap(val => this.service.getSign(val.phoneNum, val.type))
    .map(res => {
      if(res.res.success) {
          console.log(res)
          return new actions.SignSuccessAction({phoneNum: res.phoneNum,sign: res.res.dataObject, sign_type: res.sign_type})
      }else{
          return new actions.AuthFailAction({
              msg: res.res.msg
            })
      }
    })
    
    // getregistercode
      @Effect() 
      getregistercode$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.SIGN_SUCCESS)
      .map(toPayload)
      .switchMap(res => {
          console.log(res)
          if(res.sign_type === '1') {
            return this.service.getRegisterCode(res.phoneNum, res.sign)
          }
          if(res.sign_type === '2') {
            return this.service.getForgetCode(res.phoneNum, res.sign)
          }
      })
      .map((res) => {
          return new actions.RegisterVercodeSuccessAction({code: res.dataObject})
      })
    // checkregistercode
    @Effect() 
    checkregistercode$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.CHECKREGCODE)
    .map(toPayload)
    .withLatestFrom(this.store$.select(store => store.auth.auth.sign_type))
    .switchMap(([val, sign_type]) => {
        if(sign_type==='1') {
            return this.service.checkRegisterCode(val.phoneNum,val.code)
        }
        if(sign_type==='2') {
            return this.service.checkForgetCode(val.phoneNum,val.code)
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
      .switchMap(([password, auth]) => this.service.register(auth.phoneNum, auth.code, auth.sign, password.password))
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
    .switchMap(([password, auth]) => this.service.resetPassword(auth.phoneNum, auth.code, auth.sign, password.password))
    .map(res => {
        console.log(res)
      if(res.success) {
          return new actions.ForgetPasswordSuccessAction({
              msg: '修改密码成功'
          })
      }else{
          return new actions.AuthFailAction({
              msg: res.msg
            })
      }
    })
    
    @Effect()
    forgetAndHome$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.FORGET_PASSWORD_SUCCESS)
      .map(() => this.appCtrl.getRootNav().push('LoginPage'))
    
      // 修改密码
      @Effect()
      changePassword$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.CHANGE_PASSWORD)
      .map(toPayload)
      .switchMap(val => Observable.of(1))
      .map(v => new actions.ChangePasswordSuccessAction(true))
     

      @Effect()
      changeAndHome$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.CHANGE_PASSWORD_SUCCESS)
        .map(() => this.appCtrl.getRootNav().push('WorkUsercenterPage'))
   
    
    // 修改auth项
    @Effect()
    change$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.CHANGE)
    .map(toPayload)
    //.switchMap(val => Observable.of(1))
    .map(v => new actions.ChangeSuccessAction(v))
    
    @Effect()
    ChangeAndHome$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.CHANGE_SUCCESS)
      .map(_ =>{
         this.appCtrl.getActiveNavs()[this.appCtrl.getActiveNavs().length-1].pop()
         return new actions.ChangeFailAction({
            msg: ''
        })
        } 
        )
   //.do(() => console.log(this.appCtrl.getActiveNavs()[this.appCtrl.getActiveNavs().length-1]))
    constructor(
        private actions$: Actions,
        public appCtrl: App,
        private service: AuthProvider,
        private store$: Store<fromRoot.State>
    ) {}
}
