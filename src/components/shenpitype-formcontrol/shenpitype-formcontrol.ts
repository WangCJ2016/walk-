import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS} from '@angular/forms'
import { ModalController } from 'ionic-angular';
import { SelectModalComponent } from '../select-modal/select-modal'
/**
 * Generated class for the ShenpitypeFormcontrolComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'shenpitype-formcontrol',
  templateUrl: 'shenpitype-formcontrol.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ShenpitypeFormcontrolComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ShenpitypeFormcontrolComponent),
      multi: true
    }
  ]
})
export class ShenpitypeFormcontrolComponent implements  ControlValueAccessor{

  type: string;
  private propagateChange = (_: any) => { }
  constructor(private modalCtrl: ModalController) {
   
  }
  presentModal() {
    let modal = this.modalCtrl.create(SelectModalComponent)
    modal.present()
    modal.onDidDismiss(res => {
      this.type = res
      this.propagateChange(res)
    })
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
