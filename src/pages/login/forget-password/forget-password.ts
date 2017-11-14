import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
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
  step='one'
  st: string
  phoneNum: number
  phoneNumValid: boolean =  true
  form: FormGroup
  _sub: Subscription
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder, 
    private service: AuthProvider,
    private store$: Store<fromRoot.State>) {

    this.form = this.fb.group({
      phoneNum: ['', Validators.compose([Validators.required,Validators.pattern(/^[1][3,4,5,7,8][0-9]{9}$/)])],
      verCode: ['', Validators.required]
    })
   this.form.get('phoneNum').statusChanges.subscribe(v => this.phoneNumValid = v === 'INVALID'?true:false )
    this._sub = this.service.getStep().subscribe(v => this.step=v)
  }
  ngOnDestroy() {
    this._sub.unsubscribe()
  }
  
  getVercode() {}
  
  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault()
    this.form.reset()
    this.store$.dispatch(new actions.PasswordVercodeAction({
      phoneNum: value.phoneNum,
      verCode: value.verCode
    }))
  }
}
