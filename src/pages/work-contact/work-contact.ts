import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { pySegSort } from '../../utils'

import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import * as actions from '../../actions/contacts.action'
import { contact } from '../../domain'
import { Subscription } from 'rxjs/Subscription';
/**
 * Generated class for the WorkContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface contactItem{
  letter: string,
  data: Array<contact>
}
@IonicPage()
@Component({
  selector: 'page-work-contact',
  templateUrl: 'work-contact.html',
})
export class WorkContactPage {
  nameArray: Array<contact> 
  contactArray: Array<contactItem>
  _sub$:Subscription
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private store$: Store<fromRoot.State>
  ) {
    this.store$.dispatch(new actions.LoadAction({}))
  }

  ionViewDidEnter() {
    this._sub$ =this.store$.select(store => store.contacts.contacts).subscribe(v => {
      this.nameArray=v
      this.contactArray = pySegSort(this.nameArray)
    }
    )
  }
  ionViewDidLeave(){
    this._sub$.unsubscribe()
  }
  goPage(page: string, id) {
    this.navCtrl.push(page,{empId: id})
  }
 
}
