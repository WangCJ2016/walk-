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
  @Input() promembers
  @Input() proidlist
  @Output() data = new EventEmitter<any>()
  peroidArray
  peroidIndex=0
  peoArray
  peoIndex=0
  typeIndex: number 
  constructor() {
    this.peoArray = [{
      name: '全部',
    }]
    this.peroidArray = [{
      name: '全部',
    }]
}
  ngOnChanges() {
   if(this.promembers) {
    this.peoArray = [{
      name: '全部',
      },...this.promembers]
   }
   if(this.proidlist) {
     this.peroidArray = [{
      name: '全部',
    },...this.proidlist]
   }
  }
  fixClick(i) {
    i === this.typeIndex ? this.typeIndex = -1 : this.typeIndex = i
  }
  proidClick(i,id) {
    this.peroidIndex = i
    this.data.emit({parentId:id})
  }
  peoClick(i,id) {
    this.peoIndex = i
    this.data.emit({projectEmpId:id})
  }
}
