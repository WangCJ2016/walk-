import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'

import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/auth.action'

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
  phoneNum: number
  phoneNumValid: boolean =  true
  form: FormGroup
  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder,private store$: Store<fromRoot.State>) {
    this.form = this.fb.group({
      phoneNum: ['', Validators.compose([Validators.required,Validators.pattern(/^[1][3,4,5,7,8][0-9]{9}$/)])],
      verCode: ['', Validators.required]
    })
   this.form.get('phoneNum').statusChanges.subscribe(v => this.phoneNumValid = v === 'INVALID'?true:false )
  }


  
  getVercode() {
    
  }
  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault()
    this.form.reset()
    this.store$.dispatch(new actions.RegisterAction({
      phoneNum: value.phoneNum,
      verCode: value.verCode
    }))
  }
}
