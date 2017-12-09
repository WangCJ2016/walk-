import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController } from 'ionic-angular';
import { WorkHomePopverComponent} from '../../components/work-home-popver/work-home-popver'
import { Store } from '@ngrx/store'
import * as actions from '../../actions/work-home.action'
import * as fromRoot from '../../reducer'

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
  lists
  openModal
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              private modal: ModalController,
              private store$: Store<fromRoot.State>
              ) {
                this.store$.dispatch(new actions.ListAction({pageNo: 1}))
                this.store$.select(store=>store.workhome.workhomeList).subscribe(res=>{
                  if(res) {
                    this.lists=res
                  }
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
   
  goPage(page: string) {
    this.navCtrl.push(page)
  }

}
