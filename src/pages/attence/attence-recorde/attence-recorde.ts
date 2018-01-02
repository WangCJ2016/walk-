import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading } from 'ionic-angular';
import * as fromRoot from '../../../reducer'
import { Store } from '@ngrx/store'
import * as actions from '../../../actions/attence.action'
import { ToastSitutionProvider} from '../../../providers'

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
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
  loading: Loading
  _time$: Subscription
  loadNum = 0
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastSitutionProvider,
    private store$: Store<fromRoot.State>) {
      this.loading = this.toast.loadfn()
      
       this._time$ = this.time$.asObservable().subscribe(v=>{
        this.loading.present()
        this.loadNum = 1
        this.store$.dispatch(new actions.AttenceRecordAction({time: v}))
      })
      this.store$.select(store=>store.attence).subscribe(v => {
        if(this.loadNum == 1) {
          this.loading.dismiss()
          this.loadNum = 0
        }
       
        this.attenceRecordList = v.attence.attenceRecordList
      })
  }
  ionViewDidLeave(){
    this._time$.unsubscribe()
  }
  selectDay(day: string) {
    this.time$.next(day)
  }

}
