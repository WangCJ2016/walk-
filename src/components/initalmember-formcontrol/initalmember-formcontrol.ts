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
  private propagateChange = (_: any) => { }
  constructor(private modalCtrl: ModalController) {
    
  }
  ngOnChanges() {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.addIf)
  }
  presentModal() {
    let profileModal = this.modalCtrl.create(SelectPersonComponent, { title: this.title });
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
