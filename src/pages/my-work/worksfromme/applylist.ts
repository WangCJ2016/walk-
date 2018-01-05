import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll,Refresher,PopoverController } from 'ionic-angular';
import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/creatework.action'
import { CreateWorkPopoverComponent} from '../../../components/create-work-popover/create-work-popover'
/**
 * Generated class for the ApplylistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-applylist',
  templateUrl: 'applylist.html',
})
export class ApplylistPage {
  applyTimeCount
  applyCollect
  params
  lists
  pageNo=0
  records=0
  infinite:InfiniteScroll
  refresher:Refresher
  selectType
  enabled=true
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private popoverCtrl: PopoverController,
    private store$: Store<fromRoot.State>
  ) {
    this.params = this.navParams.data
    this.selectType = this.params 
    this.store$.dispatch(new actions.applyTimeCountAction({}))
    this.store$.dispatch(new actions.applySelectListAction({...this.params,pageNo:1}))
    this.store$.select(store=>store.creatwork).subscribe(v=>{
      console.log(v)
      if(v) {
        this.lists = v.worksfromme.list
        this.pageNo = v.worksfromme.pageNo
        this.records = v.worksfromme.records
        this.applyTimeCount = v.applyTimeCount
        this.applyCollect = v.applyCollect
        this.infinite?this.infinite.complete():null
        this.refresher?this.refresher.complete():null
      }
    })
  }
  sortType(data) {
    this.selectType = data
    this.store$.dispatch(new actions.applySelectListAction({...data,pageNo:1}))
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(CreateWorkPopoverComponent,{},{cssClass: 'create_work_po'});
    popover.present({
      ev: myEvent
    });
  }
  goPages(item) {
    console.log(item)
    if(item.type===2||item.type===1) {
      this.navCtrl.push('ChatPage',{name: item.name, id: item.id})
    }
    if(item.type===3) {
      this.navCtrl.push('ShiwuDetailPage',{id:item.parentId})
    }
    if(item.type===4) {
      this.navCtrl.push('PlanzDetailPage',{id:item.parentId})
    }
    if(item.type===5) {
      this.navCtrl.push('PlanyDetailPage',{id:item.parentId})
    }
    if(item.type===6) {
      this.navCtrl.push('MeetingDetailPage',{id:item.parentId})
    }
    if(item.type===7) {
      this.navCtrl.push('ShenpiDetailPage',{id:item.parentId})
    }
    if(item.type===8) {
      //this.navCtrl.push('ShiwuDetailPage',{id:item.id})
    }
  }
  doInfinite(infinite) {
    this.infinite = infinite
    if(this.lists.length<this.records) {
      this.store$.dispatch(new actions.applySelectListAction({pageNo: this.pageNo+1,...this.selectType}))
    }else{
      this.enabled = false
    }
  }
  // 上啦刷新
  doRefresh(refresher) {
    this.refresher = refresher
    this.store$.dispatch(new actions.applySelectListAction({pageNo: 1, ...this.selectType}))
  }
}
