import { Component } from '@angular/core';

/**
 * Generated class for the SelectPersonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'select-person',
  templateUrl: 'select-person.html'
})
export class SelectPersonComponent {

  text: string;

  constructor() {
    console.log('Hello SelectPersonComponent Component');
    this.text = 'Hello World';
  }

}
