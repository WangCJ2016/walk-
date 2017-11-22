import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController,ModalController } from 'ionic-angular';
import { SelectPersonComponent } from '../../../components/select-person/select-person'
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ImagePicker } from '@ionic-native/image-picker';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms'

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
  form: FormGroup
  constructor(public modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private actionSheetCtrl: ActionSheetController,
    private file: File,
    private transfer: FileTransfer,
    private imagePicker: ImagePicker,
    private fb: FormBuilder) {
      this.form = this.fb.group({
        fullName: [''],
        fujian: [{}],
        faqiren: [''],
        zhubanren: [''],
        startTime: [''],
        endTime: ['']
      })
      this.form.get('fujian').valueChanges.subscribe(res => console.log('fujian'+ JSON.stringify(res)))
      this.form.get('faqiren').valueChanges.subscribe(res => console.log('fujian'+ JSON.stringify(res)))
  }

  
  validate(c):{[key: string]:any} {
    console.log(c.value)
    if(c.value.oldpassword !== c.value.confirmpassword) {
      return null
    }
    return {
      valid: true
    }
  }
  presentModal() {
    let profileModal = this.modalCtrl.create(SelectPersonComponent, { userId: 8675309 });
    profileModal.present();
  }
  goPage(page: string) {
    this.navCtrl.push(page)
  }
  
}
