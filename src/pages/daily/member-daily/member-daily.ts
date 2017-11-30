import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/daily.action'
/**
 * Generated class for the MemberDailyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member-daily',
  templateUrl: 'member-daily.html',
})
export class MemberDailyPage {
  title: string
  time$ = new Subject<string>()
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store$: Store<fromRoot.State>
  ) {
    console.log(this.navParams)

    this.time$.asObservable().subscribe(v=>{
      this.store$.dispatch(new actions.DailyDetailAction({empId1:this.navParams.data.empId,submitDate:v}))
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberDailyPage');
  }
  selectDay(day) {
    this.time$.next(day)
  }
}
