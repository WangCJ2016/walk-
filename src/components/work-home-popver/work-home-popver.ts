import { Component } from '@angular/core';
import {  ViewController, App } from 'ionic-angular'

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
  
  constructor(
    private view: ViewController,
    private appCtrl: App
  ) {
    
  }
  openModal() {
    this.appCtrl.getRootNav().push('AddGroupPage')
    this.view.dismiss()
  }
}
