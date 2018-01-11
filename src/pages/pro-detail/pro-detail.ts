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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private store$: Store<fromRoots.State>
  ) {
    this.segment = 'shiwu'
    const params = this.navParams.data
    this.store$.dispatch(new actions.propeoAction({projectId:params.projectId}))
    this.store$.dispatch(new actions.proThingListAction({projectId:params.projectId}))
    this.store$.dispatch(new actions.proMembersAction({projectId:params.projectId}))
    this.store$.dispatch(new actions.currProjectTreeMenuAction({parentId:params.parentId,projectId:params.projectId}))
    this.store$.select(store => store.project).subscribe(v=>{
   
      if(v){
        this.propeo = v.propeo?v.propeo.phase.map(peo=>({...peo,isShow: false})):null
       
      this.proThingLists = v.proThingLists
      }
    })
  }
  thingType(type) {
    return thingType(type)
  }
}
