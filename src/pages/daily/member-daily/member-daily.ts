import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MemberDailyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member-daily',
  templateUrl: 'member-daily.html',
})
export class MemberDailyPage {
  title: string
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams)
    this.title = this.navParams.data.data
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberDailyPage');
  }

}
