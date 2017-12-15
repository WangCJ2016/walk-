import { Component, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the CountComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'count',
  templateUrl: 'count.html',
  
})
export class CountComponent {
  @Output() countNum = new EventEmitter<number>()
  num: number = 0.5
  constructor() {
    
  }
  munis() {
    this.num-=0.5
    if(this.num<0) {
      this.num = 0
    }
    this.countNum.emit(this.num)
  }
  plus() {
    this.num+=0.5
    this.countNum.emit(this.num)
  }
  
}
