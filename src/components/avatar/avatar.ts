import { Component, Input } from '@angular/core';
import {getColor} from '../../utils'
/**
 * Generated class for the AvatarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'avatar',
  templateUrl: 'avatar.html'
})
export class AvatarComponent {
  @Input() width: string = '40px'
  @Input() name: string = 'name'
  style: any
  constructor() {
  }
  ngOnChanges() {
    this.style = {
      width: this.width,
      height: this.width,
      backgroundColor: getColor(),
      lineHeight: this.width
    }
  }
}
