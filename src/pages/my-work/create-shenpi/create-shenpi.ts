import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { SelectModalComponent } from '../../../components/select-modal/select-modal'
/**
 * Generated class for the CreateShenpiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-shenpi',
  templateUrl: 'create-shenpi.html',
})
export class CreateShenpiPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateShenpiPage');
  }
  presentModal() {
    let modal = this.modalCtrl.create(SelectModalComponent)
    modal.present()
  }
}
