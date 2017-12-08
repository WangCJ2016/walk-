import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import * as actions from '../../actions/creatework.action'
import * as authActions from '../../actions/auth.action'
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
  workTime
  workPlate
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store$: Store<fromRoot.State>
  ) {
   
    const userId = localStorage.getItem('userId')
    if(userId) {
      this.store$.dispatch(new authActions.UserInfoAction({userId: userId}))
    }else{
      this.navCtrl.push('LoginPage')
    }
    this.store$.select(store=>store.auth.auth).subscribe(v=>{
      if(v.emp){
        this.empId = v.emp.id
        
      }
    })
    
  }

  ionViewDidLoad() {
    
    this.slide.paginationBulletRender = (index, className) => {
      return `<span class="custom-pagination ${className}"></span>`
    }
  }
  goPage(pageName, i) {
    if(pageName==='DailyPage'){
      this.navCtrl.push(pageName,{empId: this.empId});
      return
    }
    
    this.navCtrl.push(pageName);
  }
  goWorkTimePage(i) {
    
    this.navCtrl.push('MyWorkPage',{workTime: i});
  }
  goWorkPage(i) {
    this.navCtrl.push('MyWorkPage',{workType:i});
  }
}
