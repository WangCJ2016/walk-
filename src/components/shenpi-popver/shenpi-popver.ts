import { Component } from '@angular/core';

/**
 * Generated class for the ShenpiPopverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'shenpi-popver',
  templateUrl: 'shenpi-popver.html'
})
export class ShenpiPopverComponent {

  text: string;

  constructor() {
    console.log('Hello ShenpiPopverComponent Component');
    this.text = 'Hello World';
  }

}
