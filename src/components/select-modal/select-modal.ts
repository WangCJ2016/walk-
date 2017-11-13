import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular'
/**
 * Generated class for the SelectModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'select-modal',
  templateUrl: 'select-modal.html'
})
export class SelectModalComponent {
  shangji_show: boolean = true
  pingji_show: boolean = true
  xiaji_show: boolean = true
  constructor(private viewCtrl: ViewController) {

  }
  showList(type: string) {
    this[type] = ! this[type]
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
