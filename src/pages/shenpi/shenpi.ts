import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, InfiniteScroll } from 'ionic-angular';
import CreateWorkPopoverComponent from '../../components/shenpi-popver/shenpi-popver'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import * as actions from '../../actions/creatework.action'
import { applyList } from '../../domain'
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
  shenpiType: string
  applyList1=[]
  applyList2=[]
  
  applyList3=[]
  page1 = 0
  page2 = 0
  page3 = 0
  enabled1 = false
  enabled2 = false
  enabled3 = false
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private popoverCtrl:PopoverController,
    private store$: Store<fromRoot.State>
  ) {
    this.shenpiType = '3'
    this.store$.select(store=>store.creatwork.applyList).subscribe(v=>{
      console.log(v)
      this.infinit1?this.infinit1.complete():null
      this.infinit2?this.infinit2.complete():null
      this.infinit3?this.infinit3.complete():null
      if(v.length>0){
        
        if(v[0].type == '1'&&this.page1!=v[0].pageNo) {
          this.page1=v[0].pageNo
          this.applyList1 = [...this.applyList1,...v]
          if(this.page1 === v[0].totalPage) {
            this.infinit1.enable(false)
          }
        }
        if(v[0].type == '2'&&this.page2!=v[0].pageNo) {
          this.page2=v[0].pageNo
          this.applyList2 = [...this.applyList2,...v]
        
          if(this.page2 === v[0].totalPage) {
            this.infinit2.enable(false)
          }
        }
        if(v[0].type == '3'&&this.page3!=v[0].pageNo) {
          this.page3=v[0].pageNo
          this.applyList3 = [...this.applyList3,...v]
          
          if(this.page3 === v[0].totalPage) {
            this.infinit3.enable(false)
          }
        }
      }
      console.log(this.applyList1,this.applyList2,this.applyList3)
      
    })
  }
  doInfinite1(InfiniteScroll) { 
    this.infinit1= InfiniteScroll
    
    this.ionViewDidLoad()
  }
  doInfinite2(InfiniteScroll) {
    this.infinit1= InfiniteScroll
    this.ionViewDidLoad()
  }
  doInfinite3(InfiniteScroll) {
    this.infinit1= InfiniteScroll
    this.ionViewDidLoad()
  }
  ionViewDidLoad() {
    this.enabled1 = false
    this.enabled2 = false
    this.enabled3 = false
    this['enabled'+this.shenpiType] =  true
    this.store$.dispatch(new actions.applyListAction({type:this.shenpiType,pageNo:this['page'+this.shenpiType]+1}))
  }
  applyTypeChange() {
    this.ionViewDidLoad()
  }
  presentPopover(myEvent) {
    this.navCtrl.push('CreateShenpiPage')
  }
  goDetail(id) {
    console.log(id)
    this.navCtrl.push('ShenpiDetailPage',{id:id})
  }
}
