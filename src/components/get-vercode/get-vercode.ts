import { Component, Output, EventEmitter, Input } from '@angular/core';
import {Observable} from 'rxjs/Rx';

/**
 * Generated class for the GetVercodeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'get-vercode',
  templateUrl: 'get-vercode.html'
})
export class GetVercodeComponent {
  @Output() btnClick = new EventEmitter<any>()
  @Input() disabled: boolean
  text: Observable<any>;
  constructor() {
    this.text = Observable.of('获取验证码')
  }
  beginDisable() {
    this.disabled = true
    this.text = Observable.timer(0,1000).map(v=>60-v).take(60)
    this.text.count().subscribe(v=>{
      this.disabled = false
      this.text = Observable.of('获取验证码')
    })
    this.btnClick.emit()
  }
}
