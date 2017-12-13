import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController,Loading } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/auth.action'
import { AuthProvider } from '../../../providers/auth/auth'
import { ToastSitutionProvider} from '../../../providers'
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
  loading: Loading
  countIf: boolean = false
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private load: LoadingController,
    private service: AuthProvider,
    private toastCtrl: ToastController,
    private store$: Store<fromRoot.State>) {

      this.loading = this.load.create({
        dismissOnPageChange: true,
        duration: 5000
      })
    this.form = this.fb.group({
      verCodeGroup: this.fb.group({
        phoneNum: ['', Validators.compose([Validators.required, Validators.pattern(/^[1][3,4,5,7,8][0-9]{9}$/)])],
        verCode: ['', Validators.required],
      }),
      newPassword: ['', Validators.required],
    })
    // 获取sign
    this.store$.dispatch(new actions.SignAction({type:2}))
    this.store$.select(store => store.auth).subscribe(res => {
      console.log(res)
      this.countIf = res.auth.countIf
     this.loading.dismiss()
    })
    this._sub = this.service.getStep().subscribe(v => this.step = v)
  }
  
  ngOnDestroy() {
    this._sub.unsubscribe()
  }

  getVercode() {
    this.store$.dispatch(new actions.ForgetPasswordCodeAction({
      phoneNum: this.form.get('verCodeGroup').get('phoneNum').value,
      type: '2'
    }))
   // this.loading.present()
  }

  next({ value, valid }, ev: Event) {
    ev.preventDefault()
    this.store$.dispatch(new actions.checkForgetPasswordCodeAction({
      phoneNum: value.verCodeGroup.phoneNum,
    
    }))
  }
  form2submit(f, ev: Event) {
    console.log(f)
    if (!f.valid) {
      this.store$.dispatch(new actions.AuthFailAction({
        msg: '请输入一致的密码'
      }))
    } else {
      this.store$.dispatch(
        new actions.ForgetPasswordAction({
          password: f.value.newPassword,
          phoneNum: f.value.verCodeGroup.phoneNum
        })
      )
      this.loading.present()
      this.form.reset()
    }
  }
}
