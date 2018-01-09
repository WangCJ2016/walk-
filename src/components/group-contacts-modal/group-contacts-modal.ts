import { Component } from '@angular/core';
import { Store } from '@ngrx/store'
import { ViewController } from 'ionic-angular'
import * as contactActions from '../../actions/contacts.action'
import * as fromRoot from '../../reducer'
import { contact } from '../../domain'
import { Subscription } from 'rxjs/Subscription';
/**
 * Generated class for the GroupContactsModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'group-contacts-modal',
  templateUrl: 'group-contacts-modal.html'
})
export class GroupContactsModalComponent {
  membersName = []
  membersId = []
  contacts: Array<contact> = []
  _sub$: Subscription
  constructor(
    private store$: Store<fromRoot.State>,
    public viewCtrl: ViewController) {
    this._sub$ = this.store$.select(store => store).subscribe(store => {
      const contact = store.contacts.contacts
      
      if(contact.length>0) {
        this.contacts = contact
        this.contacts=this.contacts.map(contact=>({
          ...contact,
          checked: contact.id == store.auth.auth.emp.id
        }))
        this.membersId.push(store.auth.auth.emp.id)
        this.membersName.push(store.auth.auth.name)
      }else {
        this.store$.dispatch(new contactActions.LoadAction({}))
      }
    })
  }
  ionViewDidLeave(){
    this._sub$.unsubscribe()
  }
  updateCucumber(item, e) {
   
    if(e.checked) {
      this.membersId.push(item.id)
      this.membersName.push(item.name)
    }else {
      const index = this.membersId.indexOf(item.id)
      this.membersId.splice(index,1)
      this.membersName.splice(index,1)
    }
    
  }
  submit() {
    this.viewCtrl.dismiss({
      nameArray: this.membersName,
      idArray: this.membersId
    });
  }
  closeModal() {
    this.viewCtrl.dismiss();
  }
}
