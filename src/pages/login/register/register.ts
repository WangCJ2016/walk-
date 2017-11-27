import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/auth.action'
import { AuthProvider } from '../../../providers/auth/auth'

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  step = 'one'
  phoneNum: number
  phoneNumValid: boolean =  true
  form: FormGroup
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
   this.form.get('verCodeGroup').get('phoneNum').statusChanges.subscribe(v => this.phoneNumValid = v === 'INVALID'?true:false )
   this.store$.select(store => store.auth).subscribe(res => {
     if(res.msg) {
       this.toastCtrl.create({
         message: res.msg,
         position: 'middle',
         duration: 2000
       }).present()
     }
   })
  }
  
  ngOnDestroy() {
    this._sub.unsubscribe()
  }
  getVercode() {
    this.store$.dispatch(new actions.SignAction({phoneNum: this.form.get('verCodeGroup').get('phoneNum').value, type: '1'}))
  }
  next({ value, valid }, ev: Event) {
    ev.preventDefault()
    this.store$.dispatch(new actions.CheckRegCodeAction({
      phoneNum: value.verCodeGroup.phoneNum,
      code: value.verCodeGroup.verCode
    }))
  }
  onSubmit(f, ev: Event) {
    ev.preventDefault()
    console.log(f.value)
    //this.form.reset()
    this.store$.dispatch(new actions.RegisterAction({
      password: f.value.newPassword
    }))
  }
}
