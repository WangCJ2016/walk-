import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { App } from 'ionic-angular';
import {of} from 'rxjs/observable/of';

import { AuthProvider} from '../providers'
import * as actions from '../actions/auth.action'

@Injectable()
export class AuthEffects {
    // login
    @Effect() 
    login$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGIN)
    .map(toPayload)
    .concatMap((val: {phoneNum: string, password: string}) => this.service.login(val.phoneNum, val.password))
    .map(auth => new actions.LoginSuccessAction(auth))
    .catch(err => of(new actions.LoginFailAction({
        status: 501,
        message: err.message,
        exception: err.stack,
        path: '/login',
        timestamp: new Date()
    })))
    @Effect()
    navigateHome$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.LOGIN_SUCCESS)
      .map((action)=> action.payload)
      .do(() => this.appCtrl.getRootNav().push('RegisterPage'))
      
    // register
      @Effect()
      register$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.REGISTER)
      .map(toPayload)
      .switchMap((val:{phoneNum: string, verCode: string}) => this.service.register(val.phoneNum, val.verCode))
      .map(auth => new actions.RegisterSuccessAction(auth))

      @Effect()
      registerAndHome$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.REGISTER_SUCCESS)
        .map(() => this.appCtrl.getRootNav().push('LoginPage'))
   
    // forget password
    @Effect() 
    forgetPasswordgetvercode$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.PASSWORD_VERCOD)
    .map(toPayload)
    .switchMap((val: {phoneNum: string, verCode: string}) => {
        this.service.setStep();
    return Observable.of(1)})
    .map(auth => new actions.PasswordVercodeSuccessAction(true))
    .catch(err => of(new actions.PasswordVercodeFailAction({
        status: 501,
        message: err.message,
        exception: err.stack,
        path: '/login',
        timestamp: new Date()
    })))
    
    @Effect()
    forgetPassword$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.FORGET_PASSWORD)
    .map(toPayload)
    .switchMap(val => Observable.of(1))
    .map(v => new actions.ForgetPasswordSuccessAction(true))
    .catch(err => of(new actions.ForgetPasswordFailAction({
        status: 501,
        message: err.message,
        exception: err.stack,
        path: '/login',
        timestamp: new Date()
    })))
    @Effect()
    forgetAndHome$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.FORGET_PASSWORD_SUCCESS)
      .map(() => this.appCtrl.getRootNav().push('WorkUsercenterPage'))
    
      // 修改密码
      @Effect()
      changePassword$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.CHANGE_PASSWORD)
      .map(toPayload)
      .switchMap(val => Observable.of(1))
      .map(v => new actions.ChangePasswordSuccessAction(true))
      .catch(err => of(new actions.ChangePasswordFailAction({
          status: 501,
          message: err.message,
          exception: err.stack,
          path: '/login',
          timestamp: new Date()
      })))

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
    .catch(err => of(new actions.ChangeFailAction({
        status: 501,
        message: err.message,
        exception: err.stack,
        path: '/login',
        timestamp: new Date()
    })))
    @Effect()
    ChangeAndHome$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.CHANGE_SUCCESS)
      .map(() => this.appCtrl.getRootNav().push('MymessPage'))
    constructor(
        private actions$: Actions,
        public appCtrl: App,
        private service: AuthProvider
    ) {}
}
