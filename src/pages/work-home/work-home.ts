import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { WorkHomePopverComponent} from '../../components/work-home-popver/work-home-popver'
/**
 * Generated class for the WorkHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-work-home',
  templateUrl: 'work-home.html',
})
export class WorkHomePage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkHomePage');
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(WorkHomePopverComponent,{},{
      cssClass:'work_home_popover'});
    popover.present({
      ev: myEvent
    });
  }
  goPage(page: string) {
    this.navCtrl.push(page)
  }

}
