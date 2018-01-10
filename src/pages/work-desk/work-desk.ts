import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides,AlertController } from 'ionic-angular';
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import * as actions from '../../actions/creatework.action'
import * as attenceActions from '../../actions/attence.action'
import * as authActions from '../../actions/auth.action'
import * as dailyActions from '../../actions/daily.action'
import { dayFormat } from '../../utils'
import { Subscription } from 'rxjs/Subscription';
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
  _sub$:Subscription
  _sub1$:Subscription
  _sub2$:Subscription
  _sub3$:Subscription
  _sub4$:Subscription
  constructor(
    public navCtrl: NavController,
    private alert: AlertController,
    public navParams: NavParams,
    private store$: Store<fromRoot.State>
  ) {
  
    const userId = localStorage.getItem('userId')
    if(userId) {
      this.store$.dispatch(new authActions.UserInfoAction({userId: userId}))
    }
   this._sub$ = this.store$.select(store=>store.auth.auth).subscribe(v=>{
     console.log(v)
      if(v.emp){
        this.teamName = v.emp.team.name
        this.empId = v.emp.id
        this.store$.dispatch(new actions.workPlateAction({}))
        this.store$.dispatch(new actions.thingCountAction({}))
        this.store$.dispatch(new actions.applyCollectAction({}))
        this.store$.dispatch(new attenceActions.AttenceStatAction({time: dayFormat(new Date())}))
        this.store$.dispatch(new dailyActions.DailyStatAction({submitDate: dayFormat(new Date())}))
      }else if(v.id){
        this.alert.create({
          title: '温馨提示',
          message: '没有团队信息，请先去PC端设置',
          buttons: ['OK']
        }).present()
      }
    })
   this._sub1$ =  this.store$.select(store=>store.creatwork).subscribe(v=>{
      if(v.workPlate) {
        this.workPlate=v.workPlate
        this.thingCount = v.thingCount
        this.applyCollect = v.applyCollect
      }
    })
   this._sub2$ =  this.store$.select(store=>store.attence).subscribe(v=>{
      if(v.attence) {
        this.attencePeople = v.attence.attencePeople
      }
    })
   this._sub3$ =  this.store$.select(store=>store.daily).subscribe(v=>{
      if(v.dailyPeople) {
        this.dailyPeople = v.dailyPeople
      }
    })
   this._sub4$ = this.store$.select(store=>store.team.defaultTeam).subscribe(v=>{
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
  ionViewDidLeave(){
    this._sub$.unsubscribe()
    this._sub1$.unsubscribe()
    this._sub2$.unsubscribe()
    this._sub3$.unsubscribe()
    this._sub4$.unsubscribe()
  }
  goPage(pageName, i) {
    if(pageName==='DailyPage'){
      this.navCtrl.push(pageName,{empId: this.empId});
      return
    }
    
    this.navCtrl.push(pageName);
  }
  goWorkTimePage(i) {
    if(i) {
      this.navCtrl.push('MyWorkPage',{workTime: i});
    }else {
      this.navCtrl.push('MyWorkPage');
    }
  }
  goWorkPage(i) {
    this.navCtrl.push('MyWorkPage',{type:i+1});
  }

  goApplyAll() {
    this.navCtrl.push('ApplylistPage',{typeFlag:0,timeFlag:0,sortFlag:0});
  }
  goApplyme() {
    this.navCtrl.push('ApplylistPage',{typeFlag:1,timeFlag:0,sortFlag:0});
  }
  goApplygoon() {
    this.navCtrl.push('ApplylistPage',{typeFlag:2,timeFlag:0,sortFlag:0});
  }
}
