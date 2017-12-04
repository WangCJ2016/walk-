import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import CreateWorkPopoverComponent from '../../components/shenpi-popver/shenpi-popver'
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private popoverCtrl:PopoverController
  ) {
    this.shenpiType = 'wodeshenpi'
  }

  ionViewDidLoad() {
    
  }
  presentPopover(myEvent) {
    this.navCtrl.push('CreateShenpiPage')
  }
  goDetail() {
    this.navCtrl.push('ShenpiDetailPage')
  }
}
