import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/team.action'
import { team } from '../../../domain'
import { ToastSitutionProvider } from '../../../providers'

/**
 * Generated class for the ChangeTermPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-term',
  templateUrl: 'change-term.html',
})
export class ChangeTermPage {
  teams: Array<team>
  selectTeamId
  loading: Loading
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastSitutionProvider,
    private load: LoadingController,
    private store$: Store<fromRoot.State>) {
      this.loading = this.load.create({
        dismissOnPageChange:true,
        duration:5000
      })
      this.loading.present()
      this.store$.dispatch(new actions.LoadAction({}))
     
  }

  ionViewDidLoad() {
     this.store$.select(store=>store).subscribe(store=>{
        this.teams = store.team.teams
        this.selectTeamId = store.auth.auth.emp.teamId
        this.loading.dismiss()
     })
  }
  setDefault(id) {
    this.loading.present()
    this.store$.dispatch(new actions.SetdefaultAction({empId: id}))
  }
}
