import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms'
/**
 * Generated class for the UserMobileDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[user-mobile]', // Attribute selector
  exportAs: 'userMobile',
  providers: [{
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UserMobileDirective),
      multi: true
  }]
})
export class UserMobileDirective implements Validator{

  constructor() {
  }
  validate(c: AbstractControl): { [key: string]: any; } {
    let value: string = c.value || '';
    const pattern = /^[1][3,4,5,7,8][0-9]{9}$/
    if(value === '') {
      return {
        msg: '手机号不能为空'
      }
    }
    if (!pattern.test(value)) {
        return {
            msg: '请填写正确的手机号'
        };
    }
    return null;
}
}
