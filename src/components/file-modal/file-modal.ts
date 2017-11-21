import { Component } from '@angular/core';

/**
 * Generated class for the FileModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'file-modal',
  templateUrl: 'file-modal.html'
})
export class FileModalComponent {

  text: string;

  constructor() {
    console.log('Hello FileModalComponent Component');
    this.text = 'Hello World';
  }

}
