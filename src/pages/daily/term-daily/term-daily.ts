import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/daily.action'
import { dailyPeople} from '../../../domain'
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
/**
 * Generated class for the TermDailyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-term-daily',
  templateUrl: 'term-daily.html',
})
export class TermDailyPage {
  time$ = new Subject<string>()
  people: dailyPeople
  process
  _sub: Subscription
  _sub$: Subscription
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store$: Store<fromRoot.State>
  ) {
    
  }
  ionViewDidEnter(){
    this._sub = this.time$.asObservable().subscribe(v=>{
      this.store$.dispatch(new actions.DailyStatAction({submitDate: v}))
    })
    this._sub$ = this.store$.select(store=>store.daily.dailyPeople).subscribe(v=> {
      if(v){
        this.people=v
        this.process =parseInt(v.handIn.handInCount)/(parseInt(v.notHandIn.notHandInCount)+parseInt(v.handIn.handInCount))*100
      }
    }
    )
  }
  ionViewDidLeave(){
    this._sub.unsubscribe()
    this._sub$.unsubscribe()
  }

  
  goPage(empId:string) {
    this.navCtrl.push('DailyPage', {empId: empId})
  }
  selectDay(day: string) {
    this.time$.next(day)
  }
  changeStatus(status) {
    switch (status) {
      case 1:
        return '已读'
      case 2:
      return '未读'
      case 3:
      return '未上交'
      default:
      return '未上交'
    }
  }
}
