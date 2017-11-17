import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { contact } from '../../../domain'
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
  contact: contact
  width: string = '80px'
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.contact = this.navParams.data.contact
  }

  ionViewDidLoad() {
    
  }

}
