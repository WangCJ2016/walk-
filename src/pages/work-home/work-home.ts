import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, InfiniteScroll, Refresher } from 'ionic-angular';
import { WorkHomePopverComponent} from '../../components/work-home-popver/work-home-popver'
import { Store } from '@ngrx/store'
import * as actions from '../../actions/work-home.action'
import * as fromRoot from '../../reducer'
import { Subscription } from 'rxjs/Subscription';


/**
 * Generated class for the WorkHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-work-home',
  templateUrl: 'work-home.html',
})
export class WorkHomePage {
  lists = []
  openModal
  infinite: InfiniteScroll
  refresher: Refresher
  enabled: boolean = false
  pageNo: number = 0
  _sub$:Subscription
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              private store$: Store<fromRoot.State>
              ) {
                this.store$.dispatch(new actions.ListAction({pageNo: 1}))
               this._sub$ =  this.store$.select(store=>store.workhome.workhomeList).subscribe(res=>{
                  if(res.length>0) {
                    this.lists = res
                    this.infinite?this.infinite.complete():null
                    this.refresher?this.refresher.complete():null
                    if(this.lists.length>=15) {
                      this.enabled = true
                    }
                  }
                })
               
  }

  ionViewDidLeave(){
    this._sub$.unsubscribe()
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(WorkHomePopverComponent,{modal:this.openModal},{
      cssClass:'work_home_popover'});
    popover.present({
      ev: myEvent
    });
    //this.openModal()
  }
  doInfinite(infinite) {
    this.infinite = infinite
    if(this.lists[this.lists.length-1].pageNo+1<=this.lists[0].totalPages) {
      this.store$.dispatch(new actions.ListAction({pageNo: this.lists[this.lists.length-1].pageNo+1}))
    }else{
      this.enabled = false
    }
  }
  goPage(page: string) {
    this.navCtrl.push(page)
  }
  goPages(item) {
    if(item.type===2||item.type===1) {
      this.navCtrl.push('ChatPage',{name: item.name, id: item.id1})
    }
    if(item.type===3) {
      this.navCtrl.push('ShiwuDetailPage',{id:item.id})
    }
    if(item.type===4) {
      this.navCtrl.push('PlanzDetailPage',{id:item.id})
    }
    if(item.type===5) {
      this.navCtrl.push('PlanyDetailPage',{id:item.id})
    }
    if(item.type===6) {
      this.navCtrl.push('MeetingDetailPage',{id:item.id})
    }
    if(item.type===7) {
      this.navCtrl.push('ShenpiDetailPage',{id:item.id})
    }
    if(item.type===8) {
      //this.navCtrl.push('ShiwuDetailPage',{id:item.id})
    }
  }
  // 上啦刷新
  doRefresh(refresher) {
    this.refresher = refresher
    this.store$.dispatch(new actions.refreshAction({pageNo: 1}))
  }
}
