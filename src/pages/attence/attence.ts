import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import getDay from 'date-fns/get_day'
import { getWeekDay } from '../../utils'

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
export interface addressInfo{
  trueAddress: string,
  lng: string,
  lat: string
}
@IonicPage()
@Component({
  selector: 'page-attence',
  templateUrl: 'attence.html',
})
export class AttencePage {
  addressInfo: addressInfo
  date: Date
  weekDay: string
  _sub: Subscription
  attenceTitle: string
  attenceNum: number
  picsView: Array<string> = []
  pics: Array<string> = []
  constructor(
    @Inject('BASE_URL') private config,    
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    private fileTranfer: FileTransfer,
  
    private store$: Store<fromRoot.State>) {
      // this.loading = this.load.create({
      //   dismissOnPageChange:true,
      //   duration:5000
      // })
   this._sub = Observable.interval(1000).subscribe(_ => this.date = new Date())
   this.store$.dispatch(new actions.GetAttendacnceAction({}))
  //  this.loading.present()
  //  this.loadIf = true
  }
 ngOnDestroy() {
   this._sub.unsubscribe()
 }
  ionViewDidLoad() {
    this.date = new Date()
    this.weekDay = getWeekDay(getDay(this.date))
    this.store$.select(store => store.attence).subscribe(res => {
       
      if(res) {  
        this.attenceNum = res.attence.attenceInview
        switch(res.attence.attenceInview) {
          case 1 : {
           return this.attenceTitle = '签到'
          }
          case 2 : {
            return this.attenceTitle = '签退'
          }
          case 3 : {
            return this.attenceTitle = '外勤签到'
          }
          case 4 : {
            return this.attenceTitle = '外勤签退'
          }
          default:
          return null
        }
        // if(this.loadIf) {
        //   this.loading.dismiss()
        //   this.loadIf = false
        // }
      }
    })
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
      this.pics.push(imageData)
      this.picsView.push(imageData.replace(/^file:\/\//, ''))
     }, (err) => {
      // Handle error
     });
  }
  // 删除照片
  delPic(index: number) {
    this.pics.splice(index,1)
    this.picsView.splice(index,1)
  }
  // 获取地址
  getAdress(v) {
    this.addressInfo = JSON.parse(v)
    console.log(this.addressInfo)
  }
  // 签到或签退
  signinorup() {
    let pictures = []
    if(this.pics.length>0){
      this.pics.forEach(pic => {
        const fileTransfer: FileTransferObject = this.fileTranfer.create();
        fileTransfer.upload(pic, `${this.config.url}/appPhotoUploadServlet`,{})
        .then((res) => {
          // success
          const photo = JSON.parse(res.response).fileUrl[0]
         
          pictures.push(photo.url)
          if(pictures.length===this.pics.length) {
           
            this.store$.dispatch(new actions.SignAction({
              type:this.attenceNum,
              lng:this.addressInfo.lng,
              lat:this.addressInfo.lat,
              trueAddress:this.addressInfo.trueAddress,
              pictures:pictures.join(',')}))
          }
        }, (err) => {
          // error
        }) 
      })
    } else {
    
      this.store$.dispatch(new actions.SignAction({
        type:this.attenceNum,
        lng:this.addressInfo.lng,
        lat:this.addressInfo.lat,
        trueAddress:this.addressInfo.trueAddress}))
    }
    
    
    
    
  }
}
