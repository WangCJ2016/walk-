import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { getColor } from '../../../utils'
/**
 * Generated class for the ShenpiDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shenpi-detail',
  templateUrl: 'shenpi-detail.html',
})
export class ShenpiDetailPage {
  shenpiType: string
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.shenpiType = 'detail'
  }
  getColor(): string{
    return getColor()
  }
  ionViewDidLoad() {
   
  }

}
