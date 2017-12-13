import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { todayFormat} from '../../../utils'
/**
 * Generated class for the ChangeAttencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-attence',
  templateUrl: 'change-attence.html',
})
export class ChangeAttencePage {
  attence_types: Array<any>
  check_index: number
  todayFormat
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.todayFormat = todayFormat()
    this.attence_types = [
      {class: 'thing',title: '事假'},
      {class: 'sick',title: '病假'},
      {class: 'holiday',title: '休假'},
      {class: 'work',title: '外勤'},
      {class: 'normal',title: '正常'}]
  }

  ionViewDidEnter(){
   console.log(this.navParams.data)
  }
  choseType(index: number) {
    console.log(index)
    this.check_index = index
  }
}
