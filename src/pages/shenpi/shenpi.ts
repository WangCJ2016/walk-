import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll,Refresher } from 'ionic-angular';
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import * as actions from '../../actions/apply.action'
import { Subscription } from 'rxjs/Subscription';
import { applyStatus,applyType} from '../../utils'
/**
 * Generated class for the ShenpiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shenpi',
  templateUrl: 'shenpi.html',
})
export class ShenpiPage {
  infinit1:InfiniteScroll
  infinit2:InfiniteScroll
  infinit3:InfiniteScroll
  refresher1:Refresher
  refresher2:Refresher
  refresher3:Refresher
  shenpiType: string
  apply1
  apply2
  apply3
  enabled1 = false
  enabled2 = false
  enabled3 = false
  _sub$:Subscription
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store$: Store<fromRoot.State>
  ) {
    this.shenpiType = '3'
    this._sub$ = this.store$.select(store => store.apply).subscribe(v=>{
      if(v) {
        this.apply1 = v.apply1
        this.apply2 = v.apply2
        this.apply3 = v.apply3
        this.infinit1?this.infinit1.complete():null
        this.refresher1?this.refresher1.complete():null
        this.infinit2?this.infinit2.complete():null
        this.refresher2?this.refresher2.complete():null
        this.infinit3?this.infinit3.complete():null
        this.refresher3?this.refresher3.complete():null
      }
    })

  }
  applyStatus(classify) {
    return applyStatus(classify)
  }
  applyType(type,classify) {
    return applyType(type,classify)
  }
  ionViewDidLeave(){
    this._sub$.unsubscribe()
  }
  doRefresh1(refresher) {
    this.refresher1 = refresher
    this.store$.dispatch(new actions.appplylistAction({pageNo: 1, type:1}))
  }
  doRefresh2(refresher) {
    this.refresher2 = refresher
    this.store$.dispatch(new actions.appplylistAction({pageNo: 1, type:2}))
  }
  doRefresh3(refresher) {
    this.refresher3 = refresher
    this.store$.dispatch(new actions.appplylistAction({pageNo: 1, type:3}))
  }
  doInfinite1(InfiniteScroll) { 
    this.infinit1= InfiniteScroll
    if(this.apply1.result.length<this.apply1.records) {
      this.store$.dispatch(new actions.appplylistAction({pageNo: this.apply1.pageNo+1,type:1}))
    }else{
      this.enabled1 = false
    }
  }
  doInfinite2(InfiniteScroll) {
    this.infinit2= InfiniteScroll
    if(this.apply2.result.length<this.apply2.records) {
      this.store$.dispatch(new actions.appplylistAction({pageNo: this.apply2.pageNo+1,type:2}))
    }else{
      this.enabled2 = false
    }
  }
  doInfinite3(InfiniteScroll) {
    this.infinit3= InfiniteScroll
    if(this.apply3.result.length<this.apply3.records) {
      this.store$.dispatch(new actions.appplylistAction({pageNo: this.apply3.pageNo+1,type:1}))
    }else{
      this.enabled3 = false
    }
  }
  ionViewDidEnter() {
    this.enabled1 = true
    this.enabled2 = true
    this.enabled3 = true
    this.store$.dispatch(new actions.appplylistAction({type:3,pageNo:1}))
  }
  typeChange() {
    if(!this['apply'+this.shenpiType]) {
      this.store$.dispatch(new actions.appplylistAction({type:this.shenpiType,pageNo:1}))
    }
  }
  presentPopover(myEvent) {
    this.navCtrl.push('CreateShenpiPage')
  }
  goDetail(id) {
    this.navCtrl.push('ShenpiDetailPage',{id:id})
  }
}
