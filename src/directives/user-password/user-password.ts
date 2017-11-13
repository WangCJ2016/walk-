import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms'
/**
 * Generated class for the UserPasswordDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[user-password]', // Attribute selector
  exportAs: 'userPassword',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => UserPasswordDirective),
    multi: true
}]
})
export class UserPasswordDirective {

  constructor() {
  }
  validate(c: AbstractControl): { [key: string]: any; } {
    let value: string = c.value || '';
    const pattern = /^\w{6,16}$/
    if(value === '') {
      return {
        msg: '密码不能为空'
      }
    }
    if (!pattern.test(value)) {
        return {
            msg: '请填写正确的格式的密码'
        };
    }
    return null;
}
}
