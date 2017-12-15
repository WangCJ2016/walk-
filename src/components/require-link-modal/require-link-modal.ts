import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular'

/**
 * Generated class for the RequireLinkModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'require-link-modal',
  templateUrl: 'require-link-modal.html'
})
export class RequireLinkModalComponent {
  requireList
  select
  constructor(
    private navparms: NavParams,
    private view: ViewController
  ) {
    console.log(this.navparms.data);
    this.requireList = this.navparms.data.requireList
  }
  close() {
    this.view.dismiss()
  }
  
  submit() {
     console.log(this.select)
     this.requireList.forEach(ele => {
       if(ele.name == this.select) {
         this.view.dismiss(ele.id)
       }
     });
   }
}
