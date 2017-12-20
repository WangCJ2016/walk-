import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {  FormGroup, FormBuilder,Validators,AbstractControl } from '@angular/forms'

import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as authActions from '../../../actions/auth.action'
import { ToastSitutionProvider } from '../../../providers/toast-sitution/toast-sitution'
/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  form: FormGroup
  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     private fb: FormBuilder,
     private toast: ToastSitutionProvider,
     private toastCtrl:ToastController,
     private store$: Store<fromRoot.State>) {
    this.form = this.fb.group({
      oldpassword: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    },{validator: this.validate})
   
  }
  validate(c: AbstractControl):{[key: string]:any} {
    if(c.value.oldpassword !== c.value.confirmpassword) {
      return null
    }
    return {
      valid: true
    }
  }
  formsubmit(f, ev: Event) {
    console.log(f.get('confirmpassword').errors);
    if(f.hasError('required','oldpassword')){
      this.toast.message('原密码不能为空')
      return
    }
    if(f.hasError('required','confirmpassword')||f.hasError('msg','confirmpassword')){
      this.toast.message('新密码与确认密码不能为空且必须相等')
      return
    }
   
    this.store$.dispatch(
      new authActions.ChangePasswordAction({ oldpassword: f.value.oldpassword, newpassword: f.value.confirmpassword })
    )
  }

}
