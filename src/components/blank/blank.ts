import { Component, Input,ChangeDetectionStrategy } from '@angular/core';

/**
 * Generated class for the BlankComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'blank',
  templateUrl: 'blank.html',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class BlankComponent {
  @Input() height: string = '10px'
  @Input() bg_color: string = '#f5f5f5'
  style: {}
  constructor() {
    
  }
  ngOnChanges() {
    this.style = {
      height: this.height,
      backgroundColor: this.bg_color
    }
  }
}
