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
  jiaqin_show: boolean = true
  jiekuan_show: boolean = true
  baoxiao_show: boolean = true
  type: string
  constructor(private viewCtrl: ViewController) {

  }
  showList(type: string) {
    this[type] = ! this[type]
  }
  selecttype(type) {
    this.type = type
    this.viewCtrl.dismiss(this.type);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
