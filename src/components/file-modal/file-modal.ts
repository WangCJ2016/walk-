import { Component } from '@angular/core';
import { File } from '@ionic-native/file';
import { ViewController } from 'ionic-angular'
/**
 * Generated class for the FileModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'file-modal',
  templateUrl: 'file-modal.html'
})
export class FileModalComponent {
  files: Array<any>
  selectFile
  constructor(private file: File,
    private viewCtrl: ViewController
    ) {
    this.file.listDir(this.file.dataDirectory, '')
    .then(res => {
      this.files = res
    })
  }
  submit() {
    this.viewCtrl.dismiss(this.files[this.selectFile])
  }
  dismiss() {
    this.viewCtrl.dismiss()
  }
}
