import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as fromRoot from '../../../reducer'
import { Store } from '@ngrx/store'
import * as actions from '../../../actions/attence.action'
import { ToastSitutionProvider} from '../../../providers'

import { Subject } from 'rxjs/Subject';
/**
 * Generated class for the AttenceRecordePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attence-recorde',
  templateUrl: 'attence-recorde.html',
})
export class AttenceRecordePage {
  time$ = new Subject<string>()
  attenceRecordList
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store$: Store<fromRoot.State>) {
      const _time$ = this.time$.asObservable().subscribe(v=>{
        this.store$.dispatch(new actions.AttenceRecordAction({time: v}))
      })
      this.store$.select(store=>store.attence).subscribe(v => {
        this.attenceRecordList = v.attence.attenceRecordList
      })
  }
  selectDay(day: string) {
    this.time$.next(day)
  }

}
