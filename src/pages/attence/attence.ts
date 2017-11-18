import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import getDay from 'date-fns/get_day'
import { getWeekDay } from '../../utils'
import {Observable} from 'rxjs/Rx';
import { Subscription } from 'rxjs/subscription'
import { Camera } from '@ionic-native/camera'
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
  date: Date
  weekDay: string
  _sub: Subscription
  pics: Array<string> = ['assets/imgs/attence/iocn_today.png']
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera) {
   this._sub = Observable.interval(1000).subscribe(_ => this.date = new Date())
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
}
