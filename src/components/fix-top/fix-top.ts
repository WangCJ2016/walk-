import { Component, Input } from '@angular/core';

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
  @Input() fixArray: Array<any>
  text: string;
  typeIndex: number
  itemIndex: number
  constructor() {
   
  }
  fixClick(i) {
    i === this.typeIndex ? this.typeIndex = -1 : this.typeIndex = i
    // this.backdrop = this.typeIndex === -1 ?  false : true
  }
  backdropclick() {
    this.typeIndex = -1
    //this.backdrop = false
  }
  itemClick(id: number,ev: Event) {
    ev.preventDefault();
    ev.stopPropagation()
    this.itemIndex = id;
    this.backdropclick()
  }
}
