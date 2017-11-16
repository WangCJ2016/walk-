import {Action} from '@ngrx/store';
import {type} from '../utils/type.util';
import {Auth, Err, User} from '../domain';

export const ActionTypes = {
  LOGIN: type('[Auth] Login'),
  LOGIN_SUCCESS: type('[Auth] Login Success'),
  LOGIN_FAIL: type('[Auth] Login Fail'),
  REGISTER: type('[Auth] Register'),
  REGISTER_SUCCESS: type('[Auth] Register Success'),
  REGISTER_FAIL: type('[Auth] Register Fail'),
  LOGOUT: type('[Auth] Logout'),
  PASSWORD_VERCOD: type('[Auth] Password_vercode'),
  PASSWORD_VERCOD_SUCCESS: type('[Auth] Password_vercode_success'),
  PASSWORD_VERCOD_FAIL: type('[Auth] Password_vercode_fail'),
  FORGET_PASSWORD: type('[Auth] Forget_password'),
  FORGET_PASSWORD_SUCCESS: type('[Auth] Forget_password_success'),
  FORGET_PASSWORD_FAIL: type('[Auth] Forget_password_fail'),
  CHANGE_PASSWORD: type('[Auth] Change_password'),
  CHANGE_PASSWORD_SUCCESS: type('[Auth] Change_password_success'),
  CHANGE_PASSWORD_FAIL: type('[Auth] Change_password_fail'),
  CHANGE: type('[Auth] Change'),
  CHANGE_SUCCESS: type('[Auth] Change_success'),
  CHANGE_FAIL: type('[Auth] Change_fail'),
}

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

export class LoginFailAction implements Action {
  type = ActionTypes.LOGIN_FAIL;

  constructor(public payload: Err) {
  }
}

export class RegisterAction implements Action {
  type = ActionTypes.REGISTER;

  constructor(public payload: {phoneNum: string, verCode: string}) {
  }
}

export class RegisterSuccessAction implements Action {
  type = ActionTypes.REGISTER_SUCCESS;

  constructor(public payload: Auth) {
  }
}

export class RegisterFailAction implements Action {
  type = ActionTypes.REGISTER_FAIL;

  constructor(public payload: Err) {
  }
}

export class LogoutAction implements Action {
  type = ActionTypes.LOGOUT;

  constructor(public payload: Auth) {
  }
}
export class PasswordVercodeAction implements Action {
  type = ActionTypes.PASSWORD_VERCOD;

  constructor(public payload: { phoneNum: string, verCode: string }) {
  }
}

export class PasswordVercodeSuccessAction implements Action {
  type = ActionTypes.PASSWORD_VERCOD_SUCCESS;

  constructor(public payload: boolean) {
  }
}

export class PasswordVercodeFailAction implements Action {
  type = ActionTypes.PASSWORD_VERCOD_FAIL;

  constructor(public payload: Err) {
  }
}
// 找回密码
export class ForgetPasswordAction implements Action {
  type = ActionTypes.FORGET_PASSWORD;

  constructor(public payload: { phoneNum: string, newPassword: string }) {
  }
}

export class ForgetPasswordSuccessAction implements Action {
  type = ActionTypes.FORGET_PASSWORD_SUCCESS;

  constructor(public payload: boolean) {
  }
}

export class ForgetPasswordFailAction implements Action {
  type = ActionTypes.FORGET_PASSWORD_FAIL;

  constructor(public payload: Err) {
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

export class ChangePasswordFailAction implements Action {
  type = ActionTypes.CHANGE_PASSWORD_FAIL;

  constructor(public payload: Err) {
  }
}


// 修改auth项
export class ChangeAction implements Action {
  type = ActionTypes.CHANGE;

  constructor(public payload: { [key:string]: string}) {
  }
}

export class ChangeSuccessAction implements Action {
  type = ActionTypes.CHANGE_SUCCESS;

  constructor(public payload: { [key:string]: string}) {
  }
}

export class ChangeFailAction implements Action {
  type = ActionTypes.CHANGE_FAIL;

  constructor(public payload: Err) {
  }
}
// export type Actions
  // = LoginAction
  // | LoginSuccessAction
  // | LoginFailAction
  // | RegisterAction
  // | RegisterSuccessAction
  // | RegisterFailAction
  // | LogoutAction
  // | PasswordVercodeAction
  // | PasswordVercodeSuccessAction
  // | PasswordVercodeFailAction
  // | ForgetPasswordAction
  // | ForgetPasswordSuccessAction
  // | ForgetPasswordFailAction
  // | ChangePasswordAction
  // | ChangePasswordSuccessAction
  // | ChangePasswordFailAction
  // | ChangeHeadImageAction
  // | ChangeHeadImageSuccessAction
  // | ChangeHeadImageFailAction
  // | ChangeNameAction
  // | ChangeNameSuccessAction
  // | ChangeNameFailAction
