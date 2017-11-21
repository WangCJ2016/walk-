import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import getDay from 'date-fns/get_day'
import { getWeekDay } from '../../utils'
import getDate from 'date-fns/get_date'
import getYear from 'date-fns/get_year'
import getMonth from 'date-fns/get_month'
import {Observable} from 'rxjs/Rx';
import { Subscription } from 'rxjs/subscription'
import { Camera } from '@ionic-native/camera'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import * as actions from '../../actions/attence.action'
/**
 * Generated class for the AttencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attence',
  templateUrl: 'attence.html',
})
export class AttencePage {
  address: string
  date: Date
  weekDay: string
  _sub: Subscription
  attenceTitle: string
  pics: Array<string> = ['assets/imgs/attence/iocn_today.png']
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    private store$: Store<fromRoot.State>) {
   this._sub = Observable.interval(1000).subscribe(_ => this.date = new Date())
   this.store$.select(store => store.attence.attence).subscribe(v => {
     console.log(v)
     const today = getYear(new Date())+'-'+getMonth(new Date())+'-'+getDate(new Date())
     if(v.day !== today){
        this.attenceTitle = '签到'
        this.store$.dispatch(new actions.SetDayAction({day: today}))
     }else if(v.signin.time) {
      this.attenceTitle = '签退'
     }
    
   })
  }
 ngOnDestroy() {
   this._sub.unsubscribe()
 }
  ionViewDidLoad() {
    this.date = new Date()
    this.weekDay = getWeekDay(getDay(this.date))
  }
  goRecord() {
    this.navCtrl.push('AttenceRecordePage')
  }
  takePhotos() {
    const options = {
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      quality: 40,
      allowEdit: true,
      targetWidth: 400, //照片宽度
      targetHeight: 400
    }
    this.camera.getPicture(options).then((imageData) => {
      // this.store$.dispatch(new actions.ChangeAction({image: imageData.replace(/^file:\/\//, '')}))
      this.pics.push(imageData.replace(/^file:\/\//, ''))
     }, (err) => {
      // Handle error
     });
  }
  // 删除照片
  delPic(index: number) {
    this.pics.splice(index,1)
  }
  // 获取地址
  getAdress(v) {
    this.address = v
  }
  // 签到或签退
  signinorup() {

    const h = new Date().getHours()
    const m = new Date().getMinutes()
    const s = new Date().getSeconds()
    const time = h+':'+m+':'+s
    this.attenceTitle==='签到'? 
    this.store$.dispatch(new actions.SignAction({signin: {time: time, address:this.address}})):
    this.store$.dispatch(new actions.SignAction({signup: {time: time, address:this.address}}))
  }
}
