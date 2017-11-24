import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS} from '@angular/forms'
/**
 * Generated class for the CountComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'count',
  templateUrl: 'count.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CountComponent),
      multi: true
    }
  ]
})
export class CountComponent implements  ControlValueAccessor{
  
  num: number = 0.5
  private propagateChange = (_: any) => { }
  constructor() {
    
  }
  munis() {
    this.num-=0.5
    if(this.num<0) {
      this.num = 0
    }
    this.propagateChange(this.num)
  }
  plus() {
    this.num+=0.5
    this.propagateChange(this.num)
  }
  writeValue(obj: any): void { }
  
    registerOnChange(fn: any): void {
      this.propagateChange = fn
    }
  
    registerOnTouched() {
  
    }
    validate(c): {[key: string]: any} {
      return null
     }
}
