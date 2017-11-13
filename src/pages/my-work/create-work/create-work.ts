import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController,ModalController } from 'ionic-angular';
import { SelectPersonComponent } from '../../../components/select-person/select-person'
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

  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams, private actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateWorkPage');
  }
  
  getfujian() {  
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '拍摄',
          handler: () => {
            console.log('Archive clicked');
          }
        },
        {
          text: '照片',
          handler: () => {
            console.log('Archive clicked');
          }
        },
        {
          text: '手机文件',
          handler: () => {
            console.log('Archive clicked');
          }
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
