import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  colorArray= ['#5ed14f','#36b3a4','#4da9eb','#5e97f6','#5c6bc0','#9a7ddd','#bd84cd','#b38979','#ffa200','#f2525e']
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.shenpiType = 'detail'
    console.log(this.getColor())
  }
  getColor():string{
    const num = Math.floor(Math.random()*10)
    //const num = 5
    return this.colorArray[num]
    
  }
  ionViewDidLoad() {
   
  }

}
