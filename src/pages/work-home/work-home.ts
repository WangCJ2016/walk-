import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController, InfiniteScroll } from 'ionic-angular';
import { WorkHomePopverComponent} from '../../components/work-home-popver/work-home-popver'
import { Store } from '@ngrx/store'
import * as actions from '../../actions/work-home.action'
import * as fromRoot from '../../reducer'
import { concat } from 'rxjs/operator/concat';

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
  enabled: boolean = false
  pageNo: number = 0
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              private modal: ModalController,
              private store$: Store<fromRoot.State>
              ) {
                this.store$.dispatch(new actions.ListAction({pageNo: 1}))
                this.store$.select(store=>store.workhome.workhomeList).subscribe(res=>{
                  console.log(res)
                  if(res&&res.chatGroupPage[0].pageNo!=this.pageNo) {
                    this.pageNo = res.chatGroupPage[0].pageNo
                    this.lists = [...this.lists,...res.chatGroupPage]
                    this.infinite?this.infinite.complete():null
                    if(this.lists.length>=15) {
                      console.log(1)
                      this.enabled = true
                    }
                    if(this.pageNo == res.chatGroupPage[0].totalPages) {
                      this.enabled = false
                    }
                  }
                  console.log(this.lists)
                })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkHomePage');
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
    this.store$.dispatch(new actions.ListAction({pageNo: this.pageNo+1}))
  }
  goPage(page: string) {
    this.navCtrl.push(page)
  }
  goPages(item) {
   
    console.log(item)
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
}
