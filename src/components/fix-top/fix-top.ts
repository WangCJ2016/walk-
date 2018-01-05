import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the FixTopComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fix-top',
  templateUrl: 'fix-top.html'
})
export class FixTopComponent {
  @Input() workPlate
  @Input() workInfo
  @Output() data = new EventEmitter<any>()
  workArray
  workActiveIndex = 0
  timeArray
  timeActiveIndex = 0
  orderArray
  orderActiveIndex = 0
  text: string;
  workType = 1
  timeType: string = 'curr'
  workTime:{[key: string]:string} 
  typeIndex: number 
  
  constructor() {
    
  }
  ngOnChanges() {
    if(this.workPlate){
    const counts  = this.workPlate[this.timeType]
    
    this.workArray = [{
        name: '项目',
        num: counts[this.timeType+'PlanWeekCount']+counts[this.timeType+'PlanMonthCount'],
        id: 1
      },{
        name: '计划',
        num: 17,
        id: 2
      },{
        name: '会议',
        num: counts[this.timeType+'MettingCount'],
        id: 3
      },{
        name: '审批',
        num: counts[this.timeType+'ApplyCount'],
        id: 4
      },{
        name: '事务',
        num: counts[this.timeType+'ThingCount'],
        id: 5
    }]
    this.timeArray = [{
        name: '今天的事',
      },{
        name: '超期的',
      },{
        name: '最近一周',
      },{
        name: '远期安排',
    }]
    this.orderArray = [
       {
        name: '智能排序',
        num: 2,
        id: 12
      },{
        name: '按剩余时间',
        num: 17,
        id: 13
    }]
   if(this.workInfo&&this.workInfo.workType) {
     this.workClick(this.workInfo.workType)
   }
   if(this.workInfo&&this.workInfo.workTime) {
    this.timeClick(this.workInfo.workTime)
  }
  }
  }
  fixClick(i) {
    i === this.typeIndex ? this.typeIndex = -1 : this.typeIndex = i
    // this.backdrop = this.typeIndex === -1 ?  false : true
  }
  workClick(i) {
    this.workActiveIndex = i
    this.workType = i+1
    console.log(this.workTime)
    if(!this.workTime){
      this.workTime = {currDate: this.workPlate.curr.currDate}
    }
    this.data.emit({type: this.workType, ...this.workTime})
  }
  timeClick(i) {
    this.timeActiveIndex = i
    switch (i) {
      case 0:
      this.timeType = 'curr'
      this.workTime = {currDate:this.workPlate.curr.currDate}
      break
      case 1:
      this.timeType = 'delay'
      this.workTime = {delay:'1'}
      break
      case 2:
      this.timeType = 'week'
      this.workTime = {weekStartDate:this.workPlate.week.weekStartDate,weekEndDate:this.workPlate.week.weekEndDate}
      break
      case 3:
      this.timeType = 'forward'
      this.workTime = {forwardStartDate:this.workPlate.forward.forwardStartDate}
      break
      default:
      break
    }    
    this.data.emit({type: this.workType, ...this.workTime})
  }
  orderClick(i) {
    this.orderActiveIndex = i
  }
  backdropclick() {
    this.typeIndex = -1
    //this.backdrop = false
  }
 
}
