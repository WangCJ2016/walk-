import { Component } from '@angular/core';
import { ViewController,NavParams } from 'ionic-angular'

/**
 * Generated class for the SelectPersonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'select-person',
  templateUrl: 'select-person.html'
})
export class SelectPersonComponent {
  title = '发起人'
  shangji_show: boolean = true
  pingji_show: boolean = true
  xiaji_show: boolean = true
  constructor(private viewCtrl: ViewController,
    private params: NavParams) {
      console.log(this.params)
      this.title = this.params.data.title
  }
  showList(type: string) {
    this[type] = ! this[type]
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  submit() {
    this.viewCtrl.dismiss({name: '李冰冰'});
  }
}
