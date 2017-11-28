import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable'

import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'


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
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private store$: Store<fromRoot.State>) {
      this.authImage = this.store$.select(state => state.auth.auth.photo)
     
  }
  ionViewDidEnter(){
    this.authImage = this.store$.select(state => state.auth.auth.photo)
    this.store$.select(state => state.auth.auth).subscribe(auth => {
      this.token = auth.token
      if(this.token) {
        if(auth.name) {
          this.name = auth.name
        }else {
          this.name = auth.userName
       }
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
}
