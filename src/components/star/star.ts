import { Component, Input, Output, EventEmitter } from '@angular/core';
import { numtoarray } from '../../utils'
/**
 * Generated class for the StarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'star',
  templateUrl: 'star.html'
})
export class StarComponent {
  @Input() trsition = false
  @Output() cb = new EventEmitter<boolean>()
  @Output() starcb = new EventEmitter<number>()
  starNum: number = 0
  stars
  constructor() {
    this.stars = numtoarray(0)
    console.log(this.trsition)
  }
  starClick(num: number) {
    this.starNum = num
    this.stars = numtoarray(num + 1)
  }
  backdropclick() {
    this.trsition = false
    this.cb.emit(this.trsition)
  }
  hander() {
    this.trsition = false
    this.cb.emit(this.trsition)
    this.starcb.emit(this.starNum)
  }
}
