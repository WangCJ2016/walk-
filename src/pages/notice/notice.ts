import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import * as actions from '../../actions/work-home.action'
/**
 * Generated class for the NoticePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notice',
  templateUrl: 'notice.html',
})
export class NoticePage {
  lists=[]
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store$: Store<fromRoot.State>
  ) {
    this.store$.dispatch(new actions.noticeListAction({pageNo:1}))
    this.store$.select(store=>store.workhome.noticeList).subscribe(res=>{
      if(res) {
        this.lists = res
      }
      console.log(this.lists)
    })
  }

  goDetail(id) {
    this.navCtrl.push('NoticeDetailPage',{id:id})
  }

}
