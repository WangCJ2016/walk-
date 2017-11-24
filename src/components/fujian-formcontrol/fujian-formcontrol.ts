import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS} from '@angular/forms'
import { ModalController, ActionSheetController } from 'ionic-angular'
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker'

import { FileModalComponent } from '../file-modal/file-modal'
/**
 * Generated class for the FujianFormcontrolComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fujian-formcontrol',
  templateUrl: 'fujian-formcontrol.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FujianFormcontrolComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FujianFormcontrolComponent),
      multi: true
    }
  ]
})
export class FujianFormcontrolComponent implements ControlValueAccessor {
  selectData = {
    selectDoc: [],
    selectCamera: [],
    selectImages: [],
  }
  private propagateChange = (_: any) => { }
  constructor(private modalCtrl: ModalController,
  private actionSheetCtrl: ActionSheetController,
  private camera: Camera,
  private imagePicker: ImagePicker) {
    
  }
  writeValue(obj: any): void { }

  registerOnChange(fn: any): void {
    this.propagateChange = fn
  }

  registerOnTouched() {

  }
  // actionsheet
  getfujian() {  
    let actionSheet = this.actionSheetCtrl.create({
      title: ' ',
      buttons: [
        {
          text: '拍照',
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
              const image = {_url: imageData.replace(/^file:\/\//, ''), url: imageData}
              this.selectData.selectCamera.push(image)
              this.propagateChange(this.selectData)
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
            this.imagePicker.getPictures(options).then((results) => {
                  for(let i=0; i<results.length;i++) {
                    const image = {_url: results[i].replace(/^file:\/\//, ''), url: results[i]}
                    this.selectData.selectImages.push(image)
                  }
                  this.propagateChange(this.selectData)
                  actionSheet.dismiss()
                  return false
            }, (err) => { });
          }
        },
        {
          text: '手机文件',
          handler: () => {
            let profileModal =  this.modalCtrl.create(FileModalComponent)
            profileModal.present()
            profileModal.onDidDismiss(data => {
              this.selectData.selectDoc.push(data)
              this.propagateChange(this.selectData)
            });
           
          },
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    })
    actionSheet.present();
  }
  validate(c): {[key: string]: any} {
   return null
  }
  del(type: string, index: number) {
    if(type === 'doc') {
      this.selectData.selectDoc.splice(index, 1)
    }
    if(type === 'camera') {
      this.selectData.selectCamera.splice(index, 1)
    }
    if(type === 'image') {
      this.selectData.selectImages.splice(index, 1)
    }
    this.propagateChange(this.selectData)
  }
}
