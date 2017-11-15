import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import * as authActions from '../../actions/auth.action'
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  phoneNum: number
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toastCtrl: ToastController,
              private store$: Store<fromRoot.State>) {
                
  }

  ionViewDidLoad() {
    this.store$.select(state => state.auth).subscribe(v => console.log(v))
  }
  goPage(page: string) {
    this.navCtrl.push(page)
  }
  onSubmit(f,ev: Event) {
    ev.preventDefault()
    if(f.controls.phoneNum.errors !== null) {
      let toast = this.toastCtrl.create({
        message: f.controls.phoneNum.errors.msg,
        duration: 2000,
        position: 'middle',
        dismissOnPageChange: true
      })
      toast.present()
      return
    }else if(f.controls.password.errors !== null){
      let toast = this.toastCtrl.create({
        message: f.controls.password.errors.msg,
        duration: 2000,
        position: 'middle',
        dismissOnPageChange: true
      })
      toast.present()
      return
    }
    this.store$.dispatch(new authActions.LoginAction({
      phoneNum: f.value.phoneNum,
      password: f.value.password
    }))
  }
}
