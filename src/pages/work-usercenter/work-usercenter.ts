import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WorkUsercenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-work-usercenter',
  templateUrl: 'work-usercenter.html',
})
export class WorkUsercenterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkUsercenterPage');
  }
  goPage(page: string) {
    alert(page)
    this.navCtrl.push(page)
  }
}
