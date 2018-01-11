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
  @Input() thingTypeCount
  @Input() flag
  workInfo
  @Output() data = new EventEmitter<any>()
  @Output() typeCountData = new EventEmitter<any>()
  workArray
  timeArray
  orderArray
  orderType=0
  workType = 0
  timeType=0
  typeIndex: number 
  typeSelectIndex: number = 0
  constructor() {
   
  }
  ngOnChanges() {
    
    this.workType = this.applyTypeInfo.typeFlag
    this.timeType = this.applyTypeInfo.timeFlag
    if(this.applyTimeCount) {
      if(this.flag=='1')
      {
        this.workArray = [{
          name: '全部',
          num:this.applyCollect.applyCount+this.applyCollect.goCount,
              id: 0
          },{
              name: '我要审核的',
              num: this.applyCollect.applyCount,
              id: 1
            },{
              name: '进行中',
              num: this.applyCollect.goCount,
              id: 2
        }]
      }else {
        this.workArray = [{
          name: '全部',
          num:this.thingTypeCount?this.thingTypeCount.allCount:0,
          id:0
          },{
          name: '项目',
          num:this.thingTypeCount?this.thingTypeCount.projecCount:0,
          id:4
          },{
          name: '计划',
          num:this.thingTypeCount?this.thingTypeCount.planCount:0,
          id:5
          },{
          name: '会议',
          num:this.thingTypeCount?this.thingTypeCount.mettingCount:0,
          id:6
          },{
          name: '审批',
          num:this.thingTypeCount?this.thingTypeCount.applyCount:0,
          id:7
          },{
          name: '事务',
          num:this.thingTypeCount?this.thingTypeCount.thingCount:0,
          id:8
        }]
      }
      this.workArray.forEach((element,index) => {
        if(element.id === this.workType) {
          this.typeSelectIndex = index
        }
      });
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
  }
  fixClick(i) {
    i === this.typeIndex ? this.typeIndex = -1 : this.typeIndex = i
  }
  workClick(i) {
    this.workType = i
    this.workArray.forEach((element,index) => {
      if(element.id === this.workType) {
        this.typeSelectIndex = index
      }
    })
    this.typeCountData.emit({type:1,data:this.workType})
    this.data.emit({typeFlag: this.workType, timeFlag:this.timeType,sortFlag:this.orderType,flag:this.flag})
  }
  timeClick(i) {
    this.timeType = i
    this.typeCountData.emit({type:2,data:this.timeType})
    this.data.emit({typeFlag: this.workType, timeFlag:this.timeType,sortFlag:this.orderType,flag:this.flag})
  }
  orderClick(i) {
    this.orderType = i
    this.data.emit({typeFlag: this.workType, timeFlag:this.timeType,sortFlag:this.orderType,flag:this.flag})
  }
 
}
