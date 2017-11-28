import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera'
import { ImagePicker } from '@ionic-native/image-picker'

import { CityPickerProvider } from '../../../providers/city-picker/city-picker'
import { AuthProvider } from '../../../providers/auth/auth'
import { Observable } from 'rxjs/Observable'
import { Auth } from '../../../domain'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/auth.action'


/**
 * Generated class for the MymessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mymess',
  templateUrl: 'mymess.html',
})
export class MymessPage {
  auth$: Observable<Auth>
  cityData: string
  cityName: string 
  selectCityInfo
  provinceId: string
  cityId: string
  _provinceName: string
  _cityName: string
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    public cityPickerSev: CityPickerProvider,
    private service: AuthProvider,
    private imagePicker: ImagePicker,
    private alertCtrl: AlertController,
    private store$: Store<fromRoot.State>) {
      this.setCityPickerData()
  }

  ionViewDidEnter(){
    this.auth$ = this.store$.select(store => store.auth.auth)
    this.auth$
    .switchMap(auth => {
     this.provinceId = auth.provinceId
     this.cityId = auth.cityId
     return this.service.sysRegionList(this.provinceId)
    })
    .map(city => {
      console.log(city)
      this._provinceName = city.dataObject[0].name
      return city.dataObject.filter(city => city.id == this.cityId)
    })
    .subscribe(res => {
      this._cityName = res[0].name
      this.cityName = this._provinceName +'-'+ this._cityName
    })
  }
  // 修改头像
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '拍摄',
          handler: () => {
            const options = {
              destinationType: this.camera.DestinationType.FILE_URI,
              sourceType: this.camera.PictureSourceType.CAMERA,
              quality: 40,
              allowEdit: true,
              targetWidth: 400, //照片宽度
              targetHeight: 400
            }
            this.camera.getPicture(options).then((imageData) => {
              this.store$.dispatch(new actions.ChangeAction({image: imageData.replace(/^file:\/\//, '')}))
              actionSheet.dismiss()
              return false
             }, (err) => {
              // Handle error
             });
          }
        },
        {
          text: '照片',
          handler: () => {
            const options = {
              maximumImagesCount: 1,
              width: 100,
              height: 100,
              quality: 50
            }
            this.imagePicker.getPictures(options).then((result) => {
                  this.store$.dispatch(new actions.ChangeAction({image: result[0].replace(/^file:\/\//, '')}))
                  return false
            }, (err) => { });
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    })
    actionSheet.present();
 }
 // 修改名字
 changeName() {
  let alert = this.alertCtrl.create({
    title: '修改名字',
    inputs: [
      {
        name: 'username',
        placeholder: '请输入要修改的名字'
      }
    ],
    buttons: [
      {
        text: '取消',
        role: 'cancel',
        handler: data => {
          this.store$.dispatch(new actions.ChangeAction({name: data.username}))
        }
      },
      {
        text: '确认',
        handler: data => {
          this.store$.dispatch(new actions.ChangeAction({name: data.username}))
        }
      }
    ]
  });
  alert.present();
 }
 // 修改性别
 changeSex() {
    const alert = this.alertCtrl.create()
    alert.setTitle('请选择性别')
    alert.addInput({
      type: 'radio',
      label: '男',
      value: '1',
      checked: true
    })
    alert.addInput({
      type: 'radio',
      label: '女',
      value: '2'
    })
    alert.addButton('取消');
    alert.addButton({
      text: '确认',
      handler: (data: any) => {
        this.store$.dispatch(new actions.ChangeAction({sex: data}))
      }
    })
    alert.present();
 }
 // 修改所在地
 changeAddress() {
  
 }
 setCityPickerData(){
  this.cityPickerSev.getCitiesData()
    .then( data => {
      this.cityData = data
    });
}
cityChange(e){
  this.selectCityInfo = e
  this.cityName = e.province.text+'-'+e.city.text 
  this.service.sysRegionList('-1')
  .map(province => {
   return province.dataObject.filter(province => province.name.indexOf(this.selectCityInfo.province.text)>-1)
  })
  .switchMap(province => {
    this.provinceId = province[0].id
    return this.service.sysRegionList(province[0].id)
   .map(city => {
    return city.dataObject.filter(city => city.name.indexOf(this.selectCityInfo.city.text)>-1)
    })})
    .subscribe(v => {
      this.cityId = v[0].id
      this.store$.dispatch(new actions.ChangeAction({provinceId: this.provinceId, cityId: this.cityId}))
      })
}
 goPage(page: string, params) {
    this.navCtrl.push(page,params)
  }
}