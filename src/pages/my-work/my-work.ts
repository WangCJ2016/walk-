import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController,InfiniteScroll } from 'ionic-angular';
import { CreateWorkPopoverComponent} from '../../components/create-work-popover/create-work-popover'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import * as actions from '../../actions/creatework.action'
import { todayFormat } from '../../utils'
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
  fixArray: Array<any>
  typeIndex: number
  itemIndex: number
  data = {type: '2', currDate:'2017-12-06'}
  backdrop: boolean = false
  lists: Array<any> = []
  pageNo: number = 0
  totalPages: number = 0
  inifite$ :InfiniteScroll
  workPlate
  todayFormat
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private store$: Store<fromRoot.State>) {
    this.todayFormat = todayFormat
    this.store$.dispatch(new actions.shiwuListAction(this.data))
    this.store$.dispatch(new actions.workPlateAction({}))
    this.store$.select(store => store.creatwork).subscribe(res => {
      console.log(res)
      const shiwuList = res.shiwuList
      const workPlate = res.workPlate
      if(shiwuList&&shiwuList.pageNo!=this.pageNo) {
        this.lists = [...this.lists,...shiwuList.list]
        this.pageNo = shiwuList.pageNo
        this.totalPages++
        this.inifite$?this.inifite$.complete():null
        if(this.totalPages === shiwuList.totalPages) {
          this.inifite$?this.inifite$.enable(false):null
        }
      }
      if(workPlate) {
        this.workPlate = workPlate
      }
    })
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
    this.store$.dispatch(new actions.shiwuListAction(data))
    this.pageNo = 0
    this.totalPages = 0
    this.lists = []
    this.inifite$?this.inifite$.enable(true):null
  }
  goPlanDetail(id,type) {
    type == 1?this.navCtrl.push('PlanzDetailPage',{id: id}):this.navCtrl.push('PlanyDetailPage',{id: id})
  }
  // 下拉刷新
  doInfinite(infiniteScroll) {
    this.inifite$ = infiniteScroll
    this.store$.dispatch(new actions.shiwuListAction({...this.data, pageNo: this.pageNo+1}))
  }
}
