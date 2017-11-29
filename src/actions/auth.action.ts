import {Action} from '@ngrx/store';
import {type} from '../utils/type.util';
import {Auth, Err} from '../domain';

export const ActionTypes = {
  USERINFO:type('[Auth] userinfo'),
  USERINFO_SUCCESS:type('[Auth] userinfo_success'),
  LOGIN: type('[Auth] Login'),
  LOGIN_SUCCESS: type('[Auth] Login Success'),
  SIGN:type('[Auth] sign'),
  SIGN_SUCCESS:type('[Auth] sign_success'),
  REGISTER_VERCODE: type('[Auth] Register_vercode'),
  REGISTER_VERCODE_SUCCESS: type('[Auth] Register_vercode_success'),
  CHECKREGCODE: type('[Auth] checkregcode'),
  CHECKREGCODE_SUCCESS: type('[Auth] checkregcode_success'),
  REGISTER: type('[Auth] Register'),
  REGISTER_SUCCESS: type('[Auth] Register Success'),
  LOGOUT: type('[Auth] Logout'),
  FORGET_PASSWORD: type('[Auth] Forget_password'),
  FORGET_PASSWORD_SUCCESS: type('[Auth] Forget_password_success'),
  CHANGE_PASSWORD: type('[Auth] Change_password'),
  CHANGE_PASSWORD_SUCCESS: type('[Auth] Change_password_success'),
  TERMLIST:type('[Auth] termlist'),
  TERMLIST_SUCCESS:type('[Auth] termlist_success'),
  CHANGE: type('[Auth] Change'),
  CHANGE_SUCCESS: type('[Auth] Change_success'),
  AUTH_FAIL: type('[Auth] auth_fail')
}
export class AuthFailAction implements Action {
  type = ActionTypes.AUTH_FAIL;

  constructor(public payload: Err) {
  }
}
// 获取用户信息
export class UserInfoAction implements Action {
  type = ActionTypes.USERINFO;

  constructor(public payload: { userId: string }) {

  }
}

export class UserInfoSuccessAction implements Action {
  type = ActionTypes.USERINFO_SUCCESS;

  constructor(public payload: Auth) {
  }
}
// 登录
export class LoginAction implements Action {
  type = ActionTypes.LOGIN;

  constructor(public payload: { phoneNum: string, password: string }) {

  }
}

export class LoginSuccessAction implements Action {
  type = ActionTypes.LOGIN_SUCCESS;

  constructor(public payload: Auth) {
  }
}

// 获取sign
export class SignAction implements Action {
  type = ActionTypes.SIGN;

  constructor(public payload: {phoneNum: string, type: string}) {
  }
}

export class SignSuccessAction implements Action {
  type = ActionTypes.SIGN_SUCCESS;

  constructor(public payload: {phoneNum: string,sign: string, sign_type: string}) {
  }
}
// 获取注册验证码
export class RegisterVercodeAction implements Action {
  type = ActionTypes.REGISTER_VERCODE;

  constructor(public payload: {phoneNum: string, sign: string}) {
  }
}

export class RegisterVercodeSuccessAction implements Action {
  type = ActionTypes.REGISTER_VERCODE_SUCCESS;

  constructor(public payload: {code: string}) {
  }
}

// 注册时短信验证码校验
export class CheckRegCodeAction implements Action {
  type = ActionTypes.CHECKREGCODE;

  constructor(public payload: {phoneNum: string, code: string}) {
  }
}

export class CheckRegCodeSuccessAction implements Action {
  type = ActionTypes.CHECKREGCODE_SUCCESS;

  constructor(public payload: any) {
  }
}
// 注册
export class RegisterAction implements Action {
  type = ActionTypes.REGISTER;

  constructor(public payload: { password: string}) {
  }
}

export class RegisterSuccessAction implements Action {
  type = ActionTypes.REGISTER_SUCCESS;

  constructor(public payload: any) {
  }
}

//  登出

export class LogoutAction implements Action {
  type = ActionTypes.LOGOUT;

  constructor(public payload: Auth) {
  }
}

// 找回密码
export class ForgetPasswordAction implements Action {
  type = ActionTypes.FORGET_PASSWORD;

  constructor(public payload: { password: string}) {
  }
}

export class ForgetPasswordSuccessAction implements Action {
  type = ActionTypes.FORGET_PASSWORD_SUCCESS;

  constructor(public payload: any) {
  }
}
// 修改密码
export class ChangePasswordAction implements Action {
  type = ActionTypes.CHANGE_PASSWORD;

  constructor(public payload: { oldpassword: string, newpassword: string }) {
  }
}

export class ChangePasswordSuccessAction implements Action {
  type = ActionTypes.CHANGE_PASSWORD_SUCCESS;

  constructor(public payload: any) {
  }
}


// 修改auth项
export class ChangeAction implements Action {
  type = ActionTypes.CHANGE;

  constructor(public payload: any) {
  }
}

export class ChangeSuccessAction implements Action {
  type = ActionTypes.CHANGE_SUCCESS;

  constructor(public payload: Auth) {
  }
}
// 获取termlist
export class TermListAction implements Action {
  type = ActionTypes.TERMLIST;

  constructor(public payload: any) {
  }
}

export class TermListSuccessAction implements Action {
  type = ActionTypes.TERMLIST_SUCCESS;

  constructor(public payload: Auth) {
  }
}