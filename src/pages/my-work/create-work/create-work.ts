import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController,ModalController } from 'ionic-angular';
import { SelectPersonComponent } from '../../../components/select-person/select-person'
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ImagePicker } from '@ionic-native/image-picker';

import { FileModalComponent } from '../../../components/file-modal/file-modal'
/**
 * Generated class for the CreateWorkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-work',
  templateUrl: 'create-work.html',
})
export class CreateWorkPage {

  constructor(public modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private actionSheetCtrl: ActionSheetController,
    private file: File,
    private transfer: FileTransfer,
    private imagePicker: ImagePicker) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateWorkPage');
  }
  
  getfujian() {  
    let actionSheet = this.actionSheetCtrl.create({
      title: ' ',
      buttons: [
        {
          text: '拍摄',
          handler: () => {
            console.log('Archive clicked');
          }
        },
        {
          text: '拍照',
          handler: () => {
            console.log('Archive clicked');
          }
        },
        {
          text: '手机文件',
          handler: () => {
            // const fileTransfer: FileTransferObject = this.transfer.create();
            // const options = {}
            // this.imagePicker.getPictures(options).then((results) => {
            //   const fileTransfer: FileTransferObject = this.transfer.create();
            //   for (var i = 0; i < results.length; i++) {
            //       console.log('Image URI: ' + results[i]);
            //       const url = this.file.dataDirectory+'work++/';
            //       fileTransfer.download(results[i], url)
            //       .then((entry) => {
            //         console.log('download complete: ' + entry.toURL());
            //       }, (error) => {
            //         console.log(error)
            //       });
            //   }
            // }, (err) => { });
           
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
  presentModal() {
    let profileModal = this.modalCtrl.create(SelectPersonComponent, { userId: 8675309 });
    profileModal.present();
  }
  goPage(page: string) {
    this.navCtrl.push(page)
  }
  
}
