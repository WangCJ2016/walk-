import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import * as authActions from '../../actions/auth.action'
import {ToastSitutionProvider} from '../../providers/toast-sitution/toast-sitution'
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
              private toastSitutionProvider: ToastSitutionProvider,
              private store$: Store<fromRoot.State>) {
                this.store$.select(store => store.auth).subscribe(res => {
                  if(res.msg) {
                    this.toastSitutionProvider.message(res.msg)
                  }
                })
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
      this.store$.dispatch(new authActions.AuthFailAction({msg: f.controls.phoneNum.errors.msg}))
      return
    }else if(f.controls.password.errors !== null){
      this.store$.dispatch(new authActions.AuthFailAction({msg: f.controls.password.errors.msg}))
      return
    }
    this.store$.dispatch(new authActions.LoginAction({
      phoneNum: f.value.phoneNum,
      password: f.value.password
    }))
  }
}
