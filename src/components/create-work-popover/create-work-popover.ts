import { Component,Output } from '@angular/core';
import { App, IonicPage, ViewController } from 'ionic-angular';
/**
 * Generated class for the CreateWorkPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'create-work-popover',
  templateUrl: 'create-work-popover.html'
})
export class CreateWorkPopoverComponent {
  
  constructor(public viewCtrl: ViewController,
    public appCtrl: App) {
    
  }
  goPage(page: string) {
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(page);
  }
}
