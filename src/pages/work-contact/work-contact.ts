import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { pySegSort, getColor } from '../../utils'
/**
 * Generated class for the WorkContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface contactItem{
  letter: string,
  data: Array<string>
}
@IonicPage()
@Component({
  selector: 'page-work-contact',
  templateUrl: 'work-contact.html',
})
export class WorkContactPage {
  nameArray: Array<string> = ['李冰冰','王冰冰','赵冰冰']
  contactArray: Array<contactItem>
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.contactArray = pySegSort(this.nameArray)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkContactPage');
  }
  goPage(page: string) {
    this.navCtrl.push(page)
  }
  getColor(): string {
    return getColor()
  }
}
