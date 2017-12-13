import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Loading } from 'ionic-angular';

import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as authActions from '../../../actions/auth.action'
/**
 * Generated class for the ChangeNamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-name',
  templateUrl: 'change-name.html',
})
export class ChangeNamePage {
  name: string
  name$: Observable<string>
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
    this.name$ = this.store$.select(store => store.auth.auth.name)
  }
  clear() {
    this.name = ''
  }
  submit() {
    //authActions.
    this.store$.dispatch(new authActions.ChangeAction({name: this.name}))
    this.loading.present()
  }
}
