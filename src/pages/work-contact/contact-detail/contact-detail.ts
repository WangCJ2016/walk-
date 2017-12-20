import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { contact } from '../../../domain'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/contacts.action'
import * as chatActions from '../../../actions/chat.action'

/**
 * Generated class for the ContactDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-detail',
  templateUrl: 'contact-detail.html',
})
export class ContactDetailPage {
  contact
  width: string = '80px'
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private store$: Store<fromRoot.State>
  ) {
    this.store$.dispatch(new actions.EmpDetailAction({empId: this.navParams.data.empId}))
  }

  ionViewDidLoad() {
    this.store$.select(store=>store.contacts.empDetail).subscribe(v=>{
      this.contact=v
      console.log(v)
    })
  }
  goChat() {
    this.store$.dispatch(new chatActions.addGroupAction({type:2,empIds:this.contact.empId,name:this.contact.name}))
   
  }
}
