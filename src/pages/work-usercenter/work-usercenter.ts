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
  authImage: Observable<string>
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private store$: Store<fromRoot.State>) {
  }
  ionViewDidEnter(){
    this.authImage = this.store$.select(state => state.auth.auth.image)
  }
  goPage(page: string) {
    this.navCtrl.push(page)
  }
}
