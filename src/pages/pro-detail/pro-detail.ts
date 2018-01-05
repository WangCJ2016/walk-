import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pro-detail',
  templateUrl: 'pro-detail.html',
})
export class ProDetailPage {
  segment: string
  fixArray: Array<any>
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.segment = 'shiwu'
    this.fixArray = [{
      type: '按阶段',
      items: [{
        name: '全部',
        id: 1
      },{
        name: '第一阶段',
        id: 2
      },{
        name: '第二阶段',
        id: 3
      }]
    },{
      type: '按人员',
      items: [{
        name: '全部',
        id: 4
      },
        {
          name: '张三',
          id: 5
        }
      ]
    }]
  }

  

}
