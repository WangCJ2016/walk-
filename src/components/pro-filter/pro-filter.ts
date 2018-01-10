import { Component,Input,EventEmitter,Output } from '@angular/core';

/**
 * Generated class for the ProFilterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pro-filter',
  templateUrl: 'pro-filter.html'
})
export class ProFilterComponent {

  @Input() applyTimeCount
  @Input() applyCollect
  @Input() applyTypeInfo
  workInfo
  @Output() data = new EventEmitter<any>()
  workArray
  timeArray
  orderArray
  orderType=0
  workType = 0
  timeType=0
  typeIndex: number 
  constructor() {
    this.workArray = [{
      name: '全部',
     
      id: 1
  },{
      name: '我要审核的',
     
      id: 4
    },{
      name: '进行中',
     
      id: 5
  }]
  this.timeArray = [{
    name: '全部',
   
    id: 2
  },{
      name: '超期',
     
    },{
      name: '今天',
      
    },{
      name: '本周',
      
    },{
      name: '远期安排',
     
  }]
}
  ngOnChanges() {
    this.workType = this.applyTypeInfo.typeFlag
    if(this.applyTimeCount) {
      this.workArray = [{
          name: '全部',
        
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
      
        id: 2
      },{
          name: '超期',
         
        },{
          name: '今天',
          
        },{
          name: '本周',
          num: this.applyTimeCount.weekCount,
        },{
          name: '远期安排',
          num: this.applyTimeCount.forwardCount,
      }]
     
    }
  }
  fixClick(i) {
    i === this.typeIndex ? this.typeIndex = -1 : this.typeIndex = i
  }
  workClick(i) {
    this.workType = i
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
