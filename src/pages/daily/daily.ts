import { Component, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { numtoarray,dayFormat } from '../../utils'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import * as actions from '../../actions/daily.action'
import * as attenceActions from '../../actions/attence.action'
import { Subject } from 'rxjs/Subject';
import { StarComponent} from '../../components/star/star'
import { Subscription } from 'rxjs/Subscription';
import getYear from 'date-fns/get_year'
import getMonth from 'date-fns/get_month'
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
  isToday: boolean = true
  desc: string 
  time$ = new Subject<string>()
  dailyContent: string
  dailyId: string
  attenceList: Array<any>
  empId: string
  depId: string
  _sub$: Subscription
  _sub$1: Subscription
  dailyStatusByMonth
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modal: ModalController,
    private store$: Store<fromRoot.State>
  ) {
    
  
  }
  ionViewDidLeave(){
    this._sub$.unsubscribe()
    this._sub$1.unsubscribe()
  }
  ionViewDidEnter(){
    const year = getYear(new Date())
    const month = getMonth(new Date())+1
    const gaozaoMonth = month < 10 ?  '0'+month: month
    this.store$.dispatch(new actions.dailyStateByMonthAction({date:year+'-'+gaozaoMonth}))
    this.time$.asObservable().subscribe(v=>{
      this.isToday =  dayFormat(new Date())===v?true:false
      this.store$.dispatch(new actions.DailyDetailAction({empId1:this.navParams.data.empId,submitDate:v}))
      this.store$.dispatch(new attenceActions.AttenceRecordAction({time:v,empId:this.navParams.data.empId}))
    })
    this._sub$1 =  this.store$.select(store=>store.daily).subscribe(v=>{
      if(v.dailyStatusByMonth) {
        this.dailyStatusByMonth = v.dailyStatusByMonth
      }
    })
    this._sub$ = this.store$.select(store=>store.auth.auth.emp.id).subscribe(id=>{
      if(id===this.navParams.data.empId){
        this.title = '我'
        this.isSelf = true 
      }
      
      this.store$.select(store=>store.attence.attence).subscribe(res=>{
       
        if(res) {
          this.attenceList = res.attenceRecordList
        }
      })
      this.store$.select(store=>store.daily.dailyDetail).subscribe(v=>{
       
        if(v){
          this.empId = v.empId
          this.depId = v.deptId
          this.dailyContent = v.contents
          this.dailyId = v.dailyId
          this.title = v.name
          this.stars = v.stars
        }
        
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
    const modal = this.modal.create(StarComponent,{},{showBackdrop:true,enableBackdropDismiss:true})
    modal.present()
    modal.onDidDismiss(v=>{
      this.stars = v
      this.starsArray = numtoarray(this.stars)
      this.store$.dispatch(new actions.ModifyAction({dailyId:this.dailyId,star: v}))
    })
  }
  callback(cb) {
    this.backdrop = cb
  }
 
  // 添加日报
  addDaily() {
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
    this.time$.next(day)
  }
  selectMonth(month) {
    this.store$.dispatch(new actions.dailyStateByMonthAction({date:month}))
  }
 }
