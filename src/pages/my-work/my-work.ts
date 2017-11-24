import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController } from 'ionic-angular';
import { CreateWorkPopoverComponent} from '../../components/create-work-popover/create-work-popover'
// import { state } from '@angular/animations'
/**
 * Generated class for the MyWorkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-work',
  templateUrl: 'my-work.html',
})
export class MyWorkPage {
  fixArray: Array<any>
  typeIndex: number
  itemIndex: number
  backdrop: boolean = false
  constructor(public navCtrl: NavController, public navParams: NavParams,public popoverCtrl: PopoverController) {
    this.fixArray = [{
      type: '类型',
      items: [{
        name: '全部',
        num: 17,
        id: 0
      },{
        name: '项目相关',
        num: 2,
        id: 1
      },{
        name: '计划',
        num: 17,
        id: 2
      },{
        name: '会议',
        num: 17,
        id: 3
      },{
        name: '审批',
        num: 17,
        id: 4
      },{
        name: '事务',
        num: 17,
        id: 5
      }]
    },{
      type: '时间',
      items: [{
        name: '全部',
        num: 17,
        id: 6
      },{
        name: '超期的',
        num: 2,
        id: 7
      },{
        name: '今天的事',
        num: 17,
        id: 8
      },{
        name: '最近一周',
        num: 17,
        id: 9
      },{
        name: '远期安排',
        num: 17,
        id: 10
      }]
    },{
      type: '排序',
      items: [{
        name: '全部',
        num: 17,
        id: 11
      },{
        name: '智能排序',
        num: 2,
        id: 12
      },{
        name: '按剩余时间',
        num: 17,
        id: 13
      }]
    }]
  }


  backdropclick() {
    this.typeIndex = -1
    this.backdrop = false
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(CreateWorkPopoverComponent,{},{cssClass: 'create_work_po'});
    popover.present({
      ev: myEvent
    });
  }
  godetail() {
    this.navCtrl.push('ProDetailPage')
  }
}
