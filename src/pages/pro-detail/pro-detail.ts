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
  
    this.store$.dispatch(new actions.propeoAction({projectId:'f9b45ec46c96439396a02e7373bf3279'}))
    this.store$.dispatch(new actions.proThingListAction({projectId:'f9b45ec46c96439396a02e7373bf3279'}))
    this.store$.dispatch(new actions.proMembersAction({projectId:'f9b45ec46c96439396a02e7373bf3279'}))
    this.store$.dispatch(new actions.currProjectTreeMenuAction({parentId:'48a15216f0e04d90b3c605e7c75e7966',projectId:'f9b45ec46c96439396a02e7373bf3279'}))
    this.store$.select(store => store.project).subscribe(v=>{
      console.log(v)
      if(v){
        this.propeo = v.propeo
      this.proThingLists = v.proThingLists
      }
    })
  }
  thingType(type) {
    return thingType(type)
  }
  

}
