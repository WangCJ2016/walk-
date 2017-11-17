import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera'
import { ImagePicker } from '@ionic-native/image-picker'

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
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private store$: Store<fromRoot.State>) {
  }

  ionViewDidEnter(){
    this.auth$ = this.store$.select(store => store.auth.auth)
    this.auth$.subscribe(v => console.log(v))
  }
  
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
 goPage(page: string, params) {
    this.navCtrl.push(page,params)
  }
}