import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
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
import { ToastSitutionProvider} from '../../providers'
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
  picsView: Array<string> = []
  pics: Array<string> = []
  loading: Loading
  loadNum: number = 1
  constructor(
    @Inject('BASE_URL') private config,    
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    private fileTranfer: FileTransfer,
    private toast: ToastSitutionProvider,
    private load: LoadingController,
    private store$: Store<fromRoot.State>) {
      this.loading = this.load.create({
        dismissOnPageChange:true,
        duration:5000
      })
   this._sub = Observable.interval(1000).subscribe(_ => this.date = new Date())
   this.store$.dispatch(new actions.GetAttendacnceAction({}))
   this.loading.present()
   
  }
 ngOnDestroy() {
   this._sub.unsubscribe()
 }
  ionViewDidLoad() {
    this.date = new Date()
    this.weekDay = getWeekDay(getDay(this.date))
    this.store$.select(store=>store.attence.attence).subscribe(res=>this.attenceTitle=res.attenceInview)
    this.store$.select(store => store.attence).subscribe(res => {
      console.log(this.loading)
      if(this.loading._state>1&&this.loadNum) {
        this.loading.dismiss()
        this.loadNum = 0
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
    console.log('addressInfo'+v)
    this.addressInfo = JSON.parse(v)
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
            this.loading.present()
            this.loadNum = 1
            this.store$.dispatch(new actions.SignAction({
              type:this.attenceTitle,
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
      this.loading.present()
      this.loadNum = 1
      this.store$.dispatch(new actions.SignAction({
        type:this.attenceTitle,
        lng:this.addressInfo.lng,
        lat:this.addressInfo.lat,
        trueAddress:this.addressInfo.trueAddress}))
    }
    
    
    
    
  }
}
