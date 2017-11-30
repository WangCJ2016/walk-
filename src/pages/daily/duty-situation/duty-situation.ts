import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store'
import * as actions from '../../../actions/attence.action'
import * as fromRoot from '../../../reducer'
import { Subject } from 'rxjs/Subject';
import { attencePeople} from '../../../domain'
import { Subscription } from 'rxjs/Subscription';

/**
 * Generated class for the DutySituationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-duty-situation',
  templateUrl: 'duty-situation.html',
})
export class DutySituationPage {
  time$ = new Subject<string>()
  _sub: Subscription
  attencePeople: attencePeople
  process: number
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store$: Store<fromRoot.State>
  ) {
   this._sub = this.time$.asObservable().subscribe(v=>{
      this.store$.dispatch(new actions.AttenceStatAction({time: v}))
    })
    this.store$.select(store=>store.attence.attence).subscribe(v=>{
      this.attencePeople=v.attencePeople
      if(v.attencePeople){
        this.process =parseInt(v.attencePeople.isIn.isInCount)/(parseInt(v.attencePeople.isIn.isInCount)+parseInt(v.attencePeople.notIn.notInCount))*100
      }
    })
  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._sub.unsubscribe()
  }
  
  selectDay(day) {
    console.log(day)
    this.time$.next(day)
  }
  changeAttenceStatus(type) {
    switch (type) {
      case 1:
       return '正常'
      case 2:
      return '事假'
       case 3:
      return '病假'
      case 4:
      return '休假'
      case 5:
      return '外勤'
      case 6:
      return '迟到'
      case 7:
      return '早退'
      case 8:
      return '旷工'
      case 9:
      return '加班'
      default:
        return '未打卡'
    }
  }
}
