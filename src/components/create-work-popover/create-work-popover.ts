import { Component,Output } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController } from 'ionic-angular';
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
  
  constructor(public navCtrl: NavController) {
    
  }
  goPage(page: string) {
    this.navCtrl.push(page)
  }
}
