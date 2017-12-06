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
  @Output() data = new EventEmitter<any>()
  fixArray
  text: string;
  workType = {type: 2}
  timeType: string = 'curr'
  workTime:{[key: string]:string} 
  typeIndex: number
  itemIndex: number = 0
  constructor() {
    
  }
  ngOnChanges() {
    
    if(this.workPlate){
    const counts  = this.workPlate[this.timeType]
    this.workTime = {currDate: this.workPlate.curr.currDate}
    
    this.fixArray = [{
      type: '类型',
      items: [{
        name: '计划',
        num: counts[this.timeType+'PlanWeekCount']+counts[this.timeType+'PlanMonthCount'],
        id: 1
      },{
        name: '项目',
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
    },{
      type: '时间',
      items: [{
        name: '今天的事',
        
        id: 7
      },{
        name: '超期的',
        
        id: 8
      },{
        name: '最近一周',
        
        id: 9
      },{
        name: '远期安排',
        
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
  }
  fixClick(i) {
   
    i === this.typeIndex ? this.typeIndex = -1 : this.typeIndex = i
    // this.backdrop = this.typeIndex === -1 ?  false : true
  }
  backdropclick() {
    this.typeIndex = -1
    //this.backdrop = false
  }
  itemClick(id: number,name:string,i,ev: Event) {
    console.log(i,name,this.typeIndex)
    ev.preventDefault();
    ev.stopPropagation()
    this.itemIndex = i;
    
   
    if(this.typeIndex==0) {
      
      switch (name) {
        case '项目':{
          console.log(name)
          this.workType = {type:1}
          break
        }
        case '计划':
        this.workType = {type:2}
        break
        case '会议':
        this.workType = {type:3}
        break
        case '审批':
        this.workType = {type:4}
        break
        case '事务':
          this.workType = {type:5}
          break
        default: 
          break
     }    
    }
    if(this.typeIndex==1) {
      switch (name) {
        case '超期的':
        this.timeType = 'delay'
        this.workTime = {delay:'1'}
        break
        case '今天的事':
        this.timeType = 'curr'
        this.workTime = {currDate:this.workPlate.curr.currDate}
        break
        case '最近一周':
        this.timeType = 'week'
        this.workTime = {weekStartDate:this.workPlate.week.weekStartDate,weekEndDate:this.workPlate.week.weekEndDate}
        break
        case '远期安排':
        this.timeType = 'forward'
        this.workTime = {forwardStartDate:this.workPlate.forward.forwardStartDate,finishDate:this.workPlate.forward.forwardEndDate}
        break
        default:
        break
     }    
    }
    const counts  = this.workPlate[this.timeType]
    this.fixArray = [{
      type: '类型',
      items: [{
        name: '计划',
        num: counts[this.timeType+'PlanWeekCount']+counts[this.timeType+'PlanMonthCount'],
        id: 1
      },{
        name: '项目',
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
    },{
      type: '时间',
      items: [{
        name: '今天的事',
      
        id: 7
      },{
        name: '超期的',
       
        id: 8
      },{
        name: '最近一周',
       
        id: 9
      },{
        name: '远期安排',
        
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
    const data = {...this.workType,...this.workTime}
    this.data.emit(data)
    this.backdropclick()
  }
}
