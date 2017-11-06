import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the WorkDeskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-work-desk',
  templateUrl: 'work-desk.html',
})
export class WorkDeskPage {
  @ViewChild('slide') slide: Slides
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkDeskPage');
    this.slide.paginationBulletRender = (index, className) => {
      return `<span class="custom-pagination ${className}"></span>`
    }
  }
  goPage(pageName) {
    this.navCtrl.push(pageName);
  }
}
