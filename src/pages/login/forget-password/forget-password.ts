import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/auth.action'
import { AuthProvider } from '../../../providers/auth/auth'
/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {
  step = 'one'
  phoneNum: number
  phoneNumValid: boolean = true
  verCodeValid: boolean = true
  form: FormGroup
  form2: FormGroup
  _sub: Subscription
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private service: AuthProvider,
    private toastCtrl: ToastController,
    private store$: Store<fromRoot.State>) {

    this.form = this.fb.group({
      verCodeGroup: this.fb.group({
        phoneNum: ['', Validators.compose([Validators.required, Validators.pattern(/^[1][3,4,5,7,8][0-9]{9}$/)])],
        verCode: ['', Validators.required],
      }),
      newPassword: ['', Validators.required],
    })
    this._sub = this.service.getStep().subscribe(v => this.step = v)
  }
  ngOnDestroy() {
    this._sub.unsubscribe()
  }

  getVercode() { }

  next({ value, valid }, ev: Event) {
    ev.preventDefault()
    this.store$.dispatch(new actions.PasswordVercodeAction({
      phoneNum: value.phoneNum,
      verCode: value.verCode
    }))
  }
  form2submit(f, ev: Event) {
    if (!f.valid) {
      const toast = this.toastCtrl.create({
        message: '请输入一致的密码',
        duration: 2000,
        position: 'middle'
      })
      toast.present()
    } else {
      this.store$.dispatch(
        new actions.ForgetPasswordAction({
          phoneNum: this.form.get('verCodeGroup').get('phoneNum').value,
          newPassword: this.form.get('newPassword').value
        })
      )
      this.form.reset()
    }
  }
}
