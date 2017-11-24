import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { createObj } from '../../../domain'
/**
 * Generated class for the ShiwuDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shiwu-detail',
  templateUrl: 'shiwu-detail.html',
})
export class ShiwuDetailPage {
  segment = 'detail'
  saturation: number = 0
  data: createObj
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
    console.log(JSON.stringify(this.navParams.data))
    this.data = this.navParams.data.data
  }

  ionViewDidLoad() {
    //this.data = this.navParams.data
  }

}
