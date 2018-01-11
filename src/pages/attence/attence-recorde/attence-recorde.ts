import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as fromRoot from '../../../reducer'
import { Store } from '@ngrx/store'
import * as actions from '../../../actions/attence.action'
import { attenceType} from '../../../utils'
//import { ToastSitutionProvider} from '../../../providers'

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import getYear from 'date-fns/get_year'
import getMonth from 'date-fns/get_month'
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
  dailyStatusByMonth
  _time$: Subscription

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store$: Store<fromRoot.State>) {
      const year = getYear(new Date())
      const month = getMonth(new Date())+1
      const gaozaoMonth = month < 10 ?  '0'+month: month
      this.store$.dispatch(new actions.statusByMonthAction({date:year+'-'+gaozaoMonth}))

       this._time$ = this.time$.asObservable().subscribe(v=>{
        this.store$.dispatch(new actions.AttenceRecordAction({time: v}))
      })
      this.store$.select(store=>store.attence).subscribe(v => {
        if(v) { 
          this.attenceRecordList = v.attence.attenceRecordList
          this.dailyStatusByMonth = v.dailyStatusByMonth
        }
      })
  }
  attenceType(type) {
    return attenceType(type)
  }
  ionViewDidLeave(){
    this._time$.unsubscribe()
  }
  selectDay(day: string) {
    this.time$.next(day)
  }
  selectMonth(time) {
    this.store$.dispatch(new actions.statusByMonthAction({date:time}))
  }
}
