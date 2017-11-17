import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { pySegSort } from '../../utils'

import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import { contact } from '../../domain'
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
  nameArray: Array<any> 
  contactArray: Array<contactItem>
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private store$: Store<fromRoot.State>
  ) {
    this.store$.select(store => store.contacts.contacts).subscribe(v => this.nameArray = v)
  }

  ionViewDidLoad() {
    this.contactArray = pySegSort(this.nameArray)
  }
  goPage(page: string, param) {
    this.navCtrl.push(page,{contact: param})
  }
 
}
