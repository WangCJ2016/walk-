import { Component, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { numtoarray } from '../../utils'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import * as actions from '../../actions/daily.action'
import * as attenceActions from '../../actions/attence.action'
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
  @ViewChild('content') content:ElementRef
  stars: number
  starsArray: Array<string>
  title: string 
  showIf: boolean = false
  isSelf: boolean = false
  backdrop: boolean = false
  contentDisabled: boolean = true
  desc: string 
  time$ = new Subject<string>()
  dailyContent: string
  dailyId: string
  attenceList: Array<any>
  empId: string
  depId: string
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store$: Store<fromRoot.State>
  ) {
    console.log(this.navParams.data)
    this.time$.asObservable().subscribe(v=>{
      this.store$.dispatch(new actions.DailyDetailAction({empId1:this.navParams.data.empId,submitDate:v}))
      this.store$.dispatch(new attenceActions.AttenceRecordAction({time:v,empId:this.navParams.data.empId}))
    })
    
    //this.store$.
  }
  ionViewDidEnter(){
    this.store$.select(store=>store.auth.auth.emp.id).subscribe(id=>{
      if(id===this.navParams.data.empId){
        this.title = '我'
        this.isSelf = true 
      }
      
      this.store$.select(store=>store.attence.attence).subscribe(res=>{
        console.log(res)
        if(res) {
          this.attenceList = res.attenceRecordList
        }
      })
      this.store$.select(store=>store.daily.dailyDetail).subscribe(v=>{
        console.log(v)
        if(v){
          this.empId = v.empId
          this.depId = v.deptId
          this.dailyContent = v.contents
          this.dailyId = v.dailyId
          this.title = v.name
          this.stars = v.stars
        }
        console.log(this.dailyContent)
        if(this.stars){
          this.starsArray = numtoarray(this.stars)
        }
        if(this.isSelf&&!this.dailyContent){
          this.showIf = true
          this.contentDisabled = false
        }else{
          this.showIf = false
          this.contentDisabled = true
        }
      })
    })
    
  }
  goPage(page: string) {
    this.navCtrl.push(page,{empId:this.empId,deptId:this.depId})
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
    this.store$.dispatch(new actions.ModifyAction({dailyId:this.dailyId,star: num}))
  }
  // 添加日报
  addDaily() {
    console.log(this.desc)
    if(this.dailyContent){
      this.store$.dispatch(new actions.ModifyAction({dailyId:this.dailyId,contents: this.desc}))
    }else{
      this.store$.dispatch(new actions.AddDailyAction({content: this.desc}))
    }
   
  }
  edit() {
    this.contentDisabled = false
    this.content.nativeElement.focus()   
  }
  
  selectDay(day) {
    console.log(day)
    this.time$.next(day)
  }
 }
