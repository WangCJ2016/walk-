import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';


import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/auth.action'
/**
 * Generated class for the MySexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-sex',
  templateUrl: 'my-sex.html',
})
export class MySexPage {
  sex: string
  loading: Loading
  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      private load: LoadingController,
      private store$: Store<fromRoot.State>) {
        this.loading = this.load.create({
          dismissOnPageChange: true,
          duration: 5000
        })
  }

  ionViewDidLoad() {
    this.store$.select(store => store.auth.auth.sex).subscribe(v => this.sex=v )
  }
  submit() {
    this.store$.dispatch(new actions.ChangeAction({sex: this.sex}))
  }
}
