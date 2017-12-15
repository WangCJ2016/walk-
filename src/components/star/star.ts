import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular'
import { numtoarray } from '../../utils'
/**
 * Generated class for the StarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'star',
  templateUrl: 'star.html'
})
export class StarComponent {
  
  starNum: number = 4
  stars
  constructor(private view: ViewController) {
    this.stars = numtoarray(this.starNum)
  }
  starClick(num: number) {
    this.starNum = num
    this.stars = numtoarray(num)
  }
  
  hander() {
    
    this.view.dismiss(this.starNum)
  }
}
