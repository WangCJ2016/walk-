import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastSitutionProvider,
    private store$: Store<fromRoot.State>) {
      this.store$.dispatch(new actions.LoadAction({}))
      this.store$.select(store=>store.team).subscribe(res=>{
        if(res.msg) {
          this.toast.message(res.msg)
        }
      })
  }

  ionViewDidLoad() {
     this.store$.select(store=>store).subscribe(store=>{
        this.teams = store.team.teams
        this.selectTeamId = store.auth.auth.emp.teamId
     })
  }
  setDefault(id) {
    this.store$.dispatch(new actions.SetdefaultAction({empId: id}))
  }
}
