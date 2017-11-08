import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  { getColor } from '../../../utils' 
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
  bg_color: string
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.bg_color = getColor()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactDetailPage');
  }

}
