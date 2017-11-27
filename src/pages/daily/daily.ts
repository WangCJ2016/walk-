import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { numtoarray } from '../../utils'
/**
 * Generated class for the DailyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-daily',
  templateUrl: 'daily.html',
})
export class DailyPage {
  stars: number
  starsArray: Array<string>
  title: string = '我的'
  showIf: boolean = false
  backdrop: boolean = false
  desc: string = `今天去摆放客服螺蛳粉的就是今天去摆放客服
  螺蛳粉的就是今天去摆放客服螺蛳粉的就是今天去摆放客服螺蛳粉的
  就是今天去摆放客服螺蛳粉的就是今天去摆放客服螺蛳粉的就是今天
  去摆放客服螺蛳粉的就是今天去摆放客服螺蛳粉的就是今天去摆放客
  服螺蛳粉的就是今天去摆放客服螺蛳粉的就是今天去摆放客服螺蛳粉的就是
  服螺蛳粉的就是今天去摆放客服螺蛳粉的就是今天去摆放客服螺蛳粉的就是dd`
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = this.navParams.data.data
  }
  goPage(page: string) {
    this.navCtrl.push(page)
  }
  pingyue() {
    this.backdrop = true
  }
  callback(cb) {
    this.backdrop = cb
  }
  starcb(num) {
    this.stars = num
    this.starsArray = numtoarray(this.stars)
    console.log(this.starsArray)
  }
 }
