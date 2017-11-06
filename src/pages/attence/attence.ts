import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AttencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attence',
  templateUrl: 'attence.html',
})
export class AttencePage {
  date: Date
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.date = new Date()
  }
  goRecord() {
    this.navCtrl.push('AttenceRecordePage')
  }
}
