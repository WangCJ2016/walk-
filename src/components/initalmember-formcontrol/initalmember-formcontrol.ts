import { Component, Input, forwardRef } from '@angular/core';
import { ModalController } from 'ionic-angular'
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS} from '@angular/forms'
import { SelectPersonComponent } from '../../components/select-person/select-person'
import { person } from '../../domain'
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
  @Input () multiple = false
  @Input () addIf = true
  @Input () person: person = {name: ''}
  @Input () people: Array<person> = []
  @Input () showType = true
  private propagateChange = (_: any) => { }
  constructor(private modalCtrl: ModalController) {
    
  }
  
  presentModal() {
    let profileModal = this.modalCtrl.create(SelectPersonComponent, { title: this.title, showType: this.showType });
    profileModal.present();
    profileModal.onDidDismiss(res => {
      if(res) {
        this.multiple?this.people.push(res):this.person = res
        this.multiple?this.propagateChange(this.people):this.propagateChange(this.person)
      }
    })  
  }
  dleperson(index: number) {
    this.people.splice(index, 1)
    this.propagateChange(this.people)
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
