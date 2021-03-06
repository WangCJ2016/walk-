import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  _sub1:Subscription
  countIf: boolean = false
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private fb: FormBuilder,
    private service: AuthProvider,
    private store$: Store<fromRoot.State>) {
  
    this.form = this.fb.group({
      verCodeGroup: this.fb.group({
        phoneNum: ['', Validators.compose([Validators.required, Validators.pattern(/^[1][3,4,5,7,8][0-9]{9}$/)])],
        verCode: ['', Validators.required],
      }),
      newPassword: ['', Validators.required],
    })
    this.store$.dispatch(new actions.SignAction({type:1}))
    this._sub = this.service.getStep().subscribe(v => this.step = v)
   this.form.get('verCodeGroup').get('phoneNum').statusChanges.subscribe(v => this.phoneNumValid = v === 'INVALID'?true:false )
   this._sub1 = this.store$.select(store => store.auth).subscribe(res => {
      this.countIf = res.auth.countIf
   })
  }
  ionViewDidLeave(){
    this._sub.unsubscribe()
    this._sub1.unsubscribe()
  }
  
  getVercode() {
    this.store$.dispatch(new actions.RegisterVercodeAction({
      phoneNum: this.form.get('verCodeGroup').get('phoneNum').value,
      type: '1'
    }))
    
  }
  next({ value, valid }, ev: Event) {
  
    this.store$.dispatch(new actions.CheckRegCodeAction({
      phoneNum: value.verCodeGroup.phoneNum
    }))
  }
  onSubmit(f, ev: Event) {
    ev.preventDefault()  
    this.store$.dispatch(new actions.RegisterAction({
      password: this.form.get('newPassword').value,
      phoneNum: this.form.get('verCodeGroup').get('phoneNum').value
    }))
    this.form.reset()
  }
}
