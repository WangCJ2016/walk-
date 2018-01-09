import { Component,ChangeDetectionStrategy } from '@angular/core';
import { App, ViewController } from 'ionic-angular';
/**
 * Generated class for the CreateWorkPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'create-work-popover',
  templateUrl: 'create-work-popover.html',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CreateWorkPopoverComponent {
  
  constructor(public viewCtrl: ViewController,
    public appCtrl: App) {
    
  }
  goPage(page: string,param) {
    this.viewCtrl.dismiss();
    
    if(page === 'CreateWorkPage') {
      this.appCtrl.getRootNav().push(page,{type:1});
    }else {
      this.appCtrl.getRootNav().push(page);
    }
    
  }
}
