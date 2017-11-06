import { Component, Input } from '@angular/core';

/**
 * Generated class for the BlankComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'blank',
  templateUrl: 'blank.html'
})
export class BlankComponent {
  @Input() height: string = '10px'
  @Input() bg_color: string = '#f5f5f5'
  style: {}
  constructor() {
    this.style = {
      height: this.height,
      backgroundColor: this.bg_color
    }
    console.log(this.style)
  }
}
