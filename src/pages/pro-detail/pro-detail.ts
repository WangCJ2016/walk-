import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store'
import * as actions from '../../actions/project.action'
import * as fromRoots from '../../reducer'
import {thingType} from '../../utils'

/**
 * Generated class for the ProDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pro-detail',
  templateUrl: 'pro-detail.html',
})
export class ProDetailPage {
  segment: string
  fixArray: Array<any>
  propeo
  proThingLists
  promembers
  proidlist
  shiwuType={parentId:'',projectEmpId:''}
  infinite
  enabled
  refresher
  params
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private store$: Store<fromRoots.State>
  ) {
    this.segment = 'shiwu'
    this.params = this.navParams.data
    this.store$.dispatch(new actions.propeoAction({projectId:this.params.projectId}))
    this.store$.dispatch(new actions.proThingListAction({projectId:this.params.projectId}))
    this.store$.dispatch(new actions.proMembersAction({projectId:this.params.projectId}))
    this.store$.dispatch(new actions.currProjectTreeMenuAction({parentId:this.params.parentId,projectId:this.params.projectId}))
    this.store$.select(store => store.project).subscribe(v=>{
      if(v){
        this.propeo = v.propeo?v.propeo.phase.map(peo=>({...peo,isShow: false})):null
        this.promembers = v.promembers
        this.proidlist = v.proidlist
        this.proThingLists = v.proThingLists
        this.infinite?this.infinite.complete():null
        this.refresher?this.refresher.complete():null
      }
    })
  }
  thingType(type) {
    return thingType(type)
  }
  dataEmit(data) {
    this.shiwuType = {...this.shiwuType,...data}
    this.store$.dispatch(new actions.proThingListAction({projectId:this.params.projectId,...this.shiwuType}))
  }
  doInfinite(infinite) {
    this.infinite = infinite
    if(this.proThingLists.result.length<this.proThingLists.records) {
      this.store$.dispatch(new actions.proThingListAction({pageNo: this.proThingLists.pageNo+1,projectId:this.params.projectId,...this.shiwuType}))
    }else{
      this.enabled = false
    }
  }
  // 上啦刷新
  doRefresh(refresher) {
    this.refresher = refresher
    this.store$.dispatch(new actions.proThingListAction({pageNo: 1, projectId:this.params.projectId,...this.shiwuType}))
  }
}
