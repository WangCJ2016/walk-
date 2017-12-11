import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/work-home.action'
/**
 * Generated class for the NoticeDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notice-detail',
  templateUrl: 'notice-detail.html',
})
export class NoticeDetailPage {
  noticeDetail
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private store$: Store<fromRoot.State>
  ) {
    this.store$.dispatch(new actions.noticeDetailAction({noticeId:this.navParams.data.id}))
    this.store$.select(store=>store.workhome.noticeDetail).subscribe(res=>{
      
      if(res) {
        this.noticeDetail = res
      }
      console.log(this.noticeDetail)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticeDetailPage');
  }

}
