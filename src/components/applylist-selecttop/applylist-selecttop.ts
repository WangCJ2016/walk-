import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the ApplylistSelecttopComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'applylist-selecttop',
  templateUrl: 'applylist-selecttop.html'
})
export class ApplylistSelecttopComponent {
  @Input() applyTimeCount
  @Input() applyCollect
  @Input() applyTypeInfo
  workInfo
  @Output() data = new EventEmitter<any>()
  workArray
  timeArray
  orderArray
  orderType=0
  text: string;
  workType = 0
  timeType=0
  typeIndex: number 


  constructor() {
   
  }
  ngOnChanges() {
    this.workType = this.applyTypeInfo.typeFlag
    console.log(this.applyTimeCount)
    if(this.applyTimeCount) {
      this.workArray = [{
          name: '全部',
          num:this.applyCollect.applyCount+this.applyCollect.goCount,
          id: 1
      },{
          name: '我要审核的',
          num: this.applyCollect.applyCount,
          id: 4
        },{
          name: '进行中',
          num: this.applyCollect.goCount,
          id: 5
      }]
      this.timeArray = [{
        name: '全部',
        num:this.applyTimeCount.currCount+this.applyTimeCount.delayCount+this.applyTimeCount.weekCount+this.applyTimeCount.forwardCount,
        id: 2
      },{
          name: '超期',
          num: this.applyTimeCount.delayCount,
        },{
          name: '今天',
          num: this.applyTimeCount.currCount,
        },{
          name: '本周',
          num: this.applyTimeCount.weekCount,
        },{
          name: '远期安排',
          num: this.applyTimeCount.forwardCount,
      }]
      this.orderArray = [{
        name:'全部',
      },
        {
          name: '智能排序',
          id: 12
        },{
          name: '按剩余时间',
          id: 13
      }]
  }
  //  if(this.workInfo&&this.workInfo.workType) {
  //    this.workClick(this.workInfo.workType)
  //  }
  //  if(this.workInfo&&this.workInfo.workTime) {
  //   this.timeClick(this.workInfo.workTime)
  // }
  //}
  }
  fixClick(i) {
    i === this.typeIndex ? this.typeIndex = -1 : this.typeIndex = i
  }
  workClick(i) {
    this.workType = i
    console.log(i)
    this.data.emit({typeFlag: this.workType, timeFlag:this.timeType,sortFlag:this.orderType})
  }
  timeClick(i) {
    this.timeType = i
    this.data.emit({typeFlag: this.workType, timeFlag:this.timeType,sortFlag:this.orderType})
  }
  orderClick(i) {
    this.orderType = i
    this.data.emit({typeFlag: this.workType, timeFlag:this.timeType,sortFlag:this.orderType})
  }
 
}
