import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { numtoarray } from '../../utils'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import * as actions from '../../actions/daily.action'
import { Subject } from 'rxjs/Subject';
/**
 * Generated class for the DailyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-daily',
  templateUrl: 'daily.html',
})
export class DailyPage {
  stars: number
  starsArray: Array<string>
  title: string 
  showIf: boolean = false
  backdrop: boolean = false
  desc: string 
  time$ = new Subject<string>()
  dailyContent: string
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store$: Store<fromRoot.State>
  ) {
    console.log(this.navParams.data)
    if(!this.navParams.data.empId){
      this.title = '我'
      this.showIf = true
    }else{
      this.time$.asObservable().subscribe(v=>{
        this.store$.dispatch(new actions.DailyDetailAction({empId1:this.navParams.data.empId,submitDate:v}))
      })
      this.store$.select(store=>store.daily.dailyDetail).subscribe(v=>{
        console.log(v)
        this.dailyContent = v
      })
    }
    //this.store$.
  }
  goPage(page: string) {
    this.navCtrl.push(page)
  }
  pingyue() {
    this.backdrop = true
  }
  callback(cb) {
    this.backdrop = cb
  }
  starcb(num) {
    this.stars = num
    this.starsArray = numtoarray(this.stars)
    console.log(this.starsArray)
  }
  // 添加日报
  addDaily() {
    console.log(this.desc)
    this.store$.dispatch(new actions.AddDailyAction({content: this.desc}))
  }
  selectDay(day) {
    console.log(day)
    this.time$.next(day)
  }
 }
