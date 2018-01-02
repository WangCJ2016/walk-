import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS} from '@angular/forms'
import {  ActionSheetController } from 'ionic-angular'
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker'

// import { FileModalComponent } from '../file-modal/file-modal'
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
  // selectData = {
  //   //selectDoc: [],
  //   selectCamera: {},
  //   selectImages: {},
  // }
  images: Array<any> = []
  private propagateChange = (_: any) => { }
  constructor(
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
              this.images.push(image)
              this.propagateChange(this.images)
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
                  const image = {_url: results[0].replace(/^file:\/\//, ''), url: results[0]}
                  this.images.push(image)
                  this.propagateChange(this.images)
                  actionSheet.dismiss()
                  return false
            }, (err) => {console.log('err'+err) });
          }
        },
        // {
        //   text: '手机文件',
        //   handler: () => {
        //     let profileModal =  this.modalCtrl.create(FileModalComponent)
        //     profileModal.present()
        //     profileModal.onDidDismiss(data => {
        //       this.selectData.selectDoc.push(data)
        //       this.propagateChange(this.selectData)
        //     });
           
        //   },
        // },
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
      this.images.splice(index, 1)
    }
    if(type === 'camera') {
      this.images.splice(index, 1)
    }
    if(type === 'image') {
      this.images.splice(index, 1)
    }
    this.propagateChange(this.images)
  }
}
