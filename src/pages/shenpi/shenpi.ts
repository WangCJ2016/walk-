import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
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
  shenpiType: string
  applyPageNo1:number = 0
  applyList1=[]
  applyPageNo2:number = 0
  applyList2=[]
  applyPageNo3:number = 0
  applyList3=[]
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private popoverCtrl:PopoverController,
    private store$: Store<fromRoot.State>
  ) {
    this.shenpiType = '3'
    this.store$.select(store=>store.creatwork.applyList).subscribe(v=>{
      console.log(v)
      if(v.length>0){
        if(v[0].type == '1'&&this.applyPageNo1!=v[0].pageNo) {
          this.applyPageNo1=v[0].pageNo
          this.applyList1 = [...this.applyList1,...v]
        }
        if(v[0].type == '2'&&this.applyPageNo2!=v[0].pageNo) {
          this.applyPageNo2=v[0].pageNo
          this.applyList2 = [...this.applyList2,...v]
        }
        if(v[0].type == '3'&&this.applyPageNo3!=v[0].pageNo) {
          this.applyPageNo3=v[0].pageNo
          this.applyList3 = [...this.applyList3,...v]
        }
      }
      console.log(this.applyList1,this.applyList2,this.applyList3)
      
    })
  }

  ionViewDidLoad() {
    this.store$.dispatch(new actions.applyListAction({type:this.shenpiType,pageNo:'1'}))
  }
  applyTypeChange() {
    this.ionViewDidLoad()
  }
  presentPopover(myEvent) {
    this.navCtrl.push('CreateShenpiPage')
  }
  goDetail(id) {
    this.navCtrl.push('ShenpiDetailPage',{type:'applyId',id:id})
  }
}
