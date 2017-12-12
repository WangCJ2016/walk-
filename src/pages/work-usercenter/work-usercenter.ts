import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Loading, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable'

import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import * as actions from '../../actions/auth.action'

/**
 * Generated class for the WorkUsercenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-work-usercenter',
  templateUrl: 'work-usercenter.html',
})
export class WorkUsercenterPage {
  token: string
  name: string = '登录/注册'
  authImage: Observable<string>
  loading:  Loading
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private load: LoadingController,
    private alert: AlertController,
    private store$: Store<fromRoot.State>) {
     
  }
  ionViewDidEnter(){
    this.loading = this.load.create()
    
    this.authImage = this.store$.select(state => state.auth.auth.photo)
    this.store$.select(state => state.auth.auth).subscribe(auth => {
      this.loading.dismiss()
      this.token = auth.token
      if(this.token) {
        if(auth.name) {
          this.name = auth.name
        }else {
          this.name = auth.userName
       }
       this.name = ''
      }
      })
    this.store$.select(state => state.auth.auth).subscribe(res => console.log(res))
  }
  goPage(page: string) {
    this.navCtrl.push(page)
  }
  headClick() {
    console.log(this.token)
    this.token?this.goPage('MymessPage'):this.goPage('LoginPage')
  }
  logout() {
    this.alert.create({
      title: '是否退出',
     
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.loading.present()
            this.store$.dispatch(new actions.LogoutAction({}))
          }
        }
      ]
    }).present()
    
  }
}
