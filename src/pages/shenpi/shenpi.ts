import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShenpiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shenpi',
  templateUrl: 'shenpi.html',
})
export class ShenpiPage {
  shenpiType: string
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.shenpiType = 'wodeshenpi'
  }

  ionViewDidLoad() {
    
  }
  goDetail() {
    this.navCtrl.push('ShenpiDetailPage')
  }
}
