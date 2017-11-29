import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms'


/**
 * Generated class for the ConfirmPasswordComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'confirm-password',
  templateUrl: 'confirm-password.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> ConfirmPasswordComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(()=> ConfirmPasswordComponent),
      multi: true
    }
  ]
})
export class ConfirmPasswordComponent implements ControlValueAccessor {
  _form: FormGroup
  private propagateChange = (_: any) => {}
  constructor(private fb: FormBuilder) {
    this._form = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
    const form$ = this._form.valueChanges
    form$.subscribe(v=>{
      if(v.newPassword === v.confirmPassword) {
        this.propagateChange(v.newPassword)
      }else{
        this.propagateChange('')
      }
     }
    )
  }
  
  writeValue(obj: any): void {}

  registerOnChange(fn:any): void {
    this.propagateChange = fn
  }

  registerOnTouched() {

  }

  // 验证器
  validate(c: FormControl): {[key: string]: any} {
    if(this._form.get('newPassword').value === this._form.get('confirmPassword').value) {
      return null
    }
    return {
      msg: '新密码与确认密码必填且相同'
    }
  }
}
