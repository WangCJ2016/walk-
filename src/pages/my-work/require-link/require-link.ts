import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { RequireLinkModalComponent} from '../../../components/require-link-modal/require-link-modal'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/creatework.action'

/**
 * Generated class for the RequireLinkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-require-link',
  templateUrl: 'require-link.html',
})
export class RequireLinkPage {
  data
  requireList
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modal: ModalController,
    private store$: Store<fromRoot.State>
  ) {
    this.store$.select(store=>store.creatwork.requireList).subscribe(v=>{
      console.log(v)
      if(v){
        this.requireList = v
      }
    })
  }

  ionViewDidLoad() {
    this.data = this.navParams.data.item
  }
  link() {
    const modal = this.modal.create(RequireLinkModalComponent,{requireList:this.requireList})
    modal.present()
    modal.onDidDismiss(id=>{
      console.log(id)
      this.store$.dispatch(new actions.requireLinkAction({
        resultsId: id,
        attach: this.data.attach,
        attachName: 'image'
      }))
    })
  }
}
