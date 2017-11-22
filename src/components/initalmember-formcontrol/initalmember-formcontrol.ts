import { Component, Input, forwardRef } from '@angular/core';
import { ModalController } from 'ionic-angular'
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS} from '@angular/forms'
import { SelectPersonComponent } from '../../components/select-person/select-person'
/**
 * Generated class for the InitalmemberFormcontrolComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'initalmember-formcontrol',
  templateUrl: 'initalmember-formcontrol.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InitalmemberFormcontrolComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InitalmemberFormcontrolComponent),
      multi: true
    }
  ]
})
export class InitalmemberFormcontrolComponent implements ControlValueAccessor {
  @Input() title = '发起人'
  person: {name: string} = {name: ''}
  private propagateChange = (_: any) => { }
  constructor(private modalCtrl: ModalController) {
    
  }
  presentModal() {
    let profileModal = this.modalCtrl.create(SelectPersonComponent, { title: this.title });
    profileModal.present();
    profileModal.onDidDismiss(res => {
      if(res) {
        this.person = res
        this.propagateChange(this.person)
      }
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
