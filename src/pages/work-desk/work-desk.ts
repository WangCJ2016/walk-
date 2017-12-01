import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import * as actions from '../../actions/daily.action'
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
  empId: string
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store$: Store<fromRoot.State>
  ) {
    this.store$.select(store=>store.auth.auth).subscribe(v=>{
      if(v.emp){
        this.empId = v.emp.id
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkDeskPage');
    this.slide.paginationBulletRender = (index, className) => {
      return `<span class="custom-pagination ${className}"></span>`
    }
  }
  goPage(pageName) {
    if(pageName==='DailyPage'){
      this.navCtrl.push(pageName,{empId: this.empId});
      return
    }
    this.navCtrl.push(pageName);
  }
}
