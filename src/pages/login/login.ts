import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
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
  loading: Loading
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toastSitutionProvider: ToastSitutionProvider,
              private load: LoadingController,
              private store$: Store<fromRoot.State>) {
                this.loading = this.load.create({
                  dismissOnPageChange: true,
                  duration: 5000
                })
             
  }

  
  goPage(page: string) {
    this.navCtrl.push(page)
  }
  onSubmit(f,ev: Event) {
    ev.preventDefault()
    if(f.controls.phoneNum.errors !== null) {
      this.toastSitutionProvider.message(f.controls.phoneNum.errors.msg)
      return
    }else if(f.controls.password.errors !== null){
      this.toastSitutionProvider.message(f.controls.password.errors.msg)
      return
    }
    //this.loading.present()
    this.store$.dispatch(new authActions.LoginAction({
      phoneNum: f.value.phoneNum,
      password: f.value.password
    }))
    f.reset()
  }
}
