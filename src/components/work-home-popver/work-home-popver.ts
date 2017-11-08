import { Component } from '@angular/core';

/**
 * Generated class for the WorkHomePopverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'work-home-popver',
  templateUrl: 'work-home-popver.html'
})
export class WorkHomePopverComponent {

  text: string;

  constructor() {
    console.log('Hello WorkHomePopverComponent Component');
    this.text = 'Hello World';
  }

}
