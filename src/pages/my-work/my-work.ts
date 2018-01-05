import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController,InfiniteScroll, Refresher } from 'ionic-angular';
import { CreateWorkPopoverComponent} from '../../components/create-work-popover/create-work-popover'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import * as actions from '../../actions/creatework.action'
import { todayFormat } from '../../utils'
import { Subscription } from 'rxjs/Subscription';
// import { state } from '@angular/animations'
/**
 * Generated class for the MyWorkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// getYear(new Date())+'-'+getMonth(new Date())+'-'+getDate(new Date())
@IonicPage()
@Component({
  selector: 'page-my-work',
  templateUrl: 'my-work.html',
})
export class MyWorkPage {
  @ViewChild('ininfinite') ininfinite
  fixArray: Array<any>
  typeIndex: number
  itemIndex: number
  data
  backdrop: boolean = false
  lists: Array<any> = []
  pageNo: number = 0
  totalPages: number = 0
  inifite$ :InfiniteScroll
  refresher: Refresher
  workPlate
  todayFormat
  workType
  enable: boolean
  _sub$:Subscription
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private store$: Store<fromRoot.State>) {
    
  }
  ionViewDidEnter(){
    this.data = this.navParams.data
    this.todayFormat = todayFormat
    this.store$.dispatch(new actions.shiwuListAction({...this.data,pageNo:1}))
    this.store$.dispatch(new actions.workPlateAction({}))
    this._sub$ = this.store$.select(store => store.creatwork).subscribe(res => {
      const shiwuList = res.shiwuList
      const workPlate = res.workPlate
      if(shiwuList) {
        this.lists = shiwuList.list
        this.pageNo = shiwuList.pageNo
        this.inifite$?this.inifite$.complete():null
        this.refresher?this.refresher.complete():null
        this.enable = this.lists.length===shiwuList.records?false:true 
      }
      if(workPlate) {
        this.workPlate = workPlate
      }
    })
  }
 ionViewDidLeave(){
  this._sub$.unsubscribe()
 }
  backdropclick() {
    this.typeIndex = -1
    this.backdrop = false
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(CreateWorkPopoverComponent,{},{cssClass: 'create_work_po'});
    popover.present({
      ev: myEvent
    });
  }
  // 获取筛选条件
  getDate(data) {
    console.log(data)
    this.data = data
    this.workType = this.data.type
    this.store$.dispatch(new actions.shiwuListAction({...data,pageNo:1}))
    this.pageNo = 1
    this.lists = []
    this.inifite$?this.inifite$.enable(true):null
  }
  goPlanDetail(id,type) {
    if(this.workType == 2) {
      type == 1?this.navCtrl.push('PlanzDetailPage',{id: id}):this.navCtrl.push('PlanyDetailPage',{id: id})
    }
    
    if(this.workType == 3) {
      this.navCtrl.push('MeetingDetailPage',{id: id})
    }
    if(this.workType == 4) {
      this.navCtrl.push('ShenpiDetailPage',{id: id})
    }
    if(this.workType == 5) {
      this.navCtrl.push('ShiwuDetailPage',{id: id})
    }
  }
  // 下拉刷新
  doInfinite(infiniteScroll) {
    this.inifite$ = infiniteScroll
    this.store$.dispatch(new actions.shiwuListAction({...this.data, pageNo: this.pageNo+1}))
  }
  doRefresh(refresher) {
    this.refresher = refresher
    this.store$.dispatch(new actions.shiwuListAction({...this.data, pageNo: 0}))
  }
}
