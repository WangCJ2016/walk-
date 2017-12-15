import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, LoadingController } from 'ionic-angular';
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import * as actions from '../../actions/creatework.action'
import * as attenceActions from '../../actions/attence.action'
import * as authActions from '../../actions/auth.action'
import * as dailyActions from '../../actions/daily.action'
import { dayFormat } from '../../utils'
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
  teamName: string
  workTime
  workPlate
  team
  thingCount
  attencePeople
  dailyPeople
  applyCollect
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private load: LoadingController,
    private store$: Store<fromRoot.State>
  ) {
  
    const userId = localStorage.getItem('userId')
    if(userId) {
      this.store$.dispatch(new authActions.UserInfoAction({userId: userId}))
    }
    this.store$.select(store=>store.auth.auth).subscribe(v=>{
      console.log(v)
      if(v.emp){
        this.teamName = v.emp.team.name
        this.empId = v.emp.id
        this.store$.dispatch(new actions.workPlateAction({}))
        this.store$.dispatch(new actions.thingCountAction({}))
        this.store$.dispatch(new actions.applyCollectAction({}))
        this.store$.dispatch(new attenceActions.AttenceStatAction({time: dayFormat(new Date())}))
        this.store$.dispatch(new dailyActions.DailyStatAction({submitDate: dayFormat(new Date())}))
      }
    })
    this.store$.select(store=>store.creatwork).subscribe(v=>{
      console.log(v)
      if(v.workPlate) {
        this.workPlate=v.workPlate
        this.thingCount = v.thingCount
        this.applyCollect = v.applyCollect
      }
    })
    this.store$.select(store=>store.attence).subscribe(v=>{
      console.log(v)
      if(v.attence) {
        this.attencePeople = v.attence.attencePeople
      }
    })
    this.store$.select(store=>store.daily).subscribe(v=>{
      console.log(v)
      if(v.dailyPeople) {
        this.dailyPeople = v.dailyPeople
      }
    })
    this.store$.select(store=>store.team.defaultTeam).subscribe(v=>{
      if(v){
        this.team = v
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
