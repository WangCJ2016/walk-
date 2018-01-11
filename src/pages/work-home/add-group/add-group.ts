import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { GroupContactsModalComponent} from '../../../components/group-contacts-modal/group-contacts-modal'
import { Store } from '@ngrx/store'
import * as actions from '../../../actions/chat.action'
import * as fromRoot from '../../../reducer'
import { ToastSitutionProvider} from '../../../providers'
/**
 * Generated class for the AddGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-group',
  templateUrl: 'add-group.html',
})
export class AddGroupPage {
  members = []
  name: string
  ids =[]
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modal: ModalController,
    private toast: ToastSitutionProvider,
    private store$: Store<fromRoot.State>
  ) {
  }
  addMember() {
     const modal = this.modal.create(GroupContactsModalComponent)
      modal.present()
      modal.onDidDismiss(res=>{
        this.members = res.nameArray
        this.ids = res.idArray
      })
  }
  submit(){
    if(this.members.length>0) {
      this.store$.dispatch(new actions.addGroupAction({type: 1,name:this.name, empIds: this.ids.join(',')}))
      
    }
    else {
      this.toast.message('请先选择成员')
    }
  }
}
