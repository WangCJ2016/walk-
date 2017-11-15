import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Auth} from '../../domain'

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  step1 = new BehaviorSubject<string>('one')
  
  constructor(public http: Http) {
    
  }
  login(phoneNum: string, password: string): Observable<Auth> {
    // const uri = `${this.config.uri}/users`;
    return Observable.of({name: 'wcj'})
  }
  register(phoneNum: string, verCode: string): Observable<Auth> {
    // const uri = `${this.config.uri}/users`;
    return Observable.of({name: 'wcj'})
  }
  getStep() {
    return this.step1.asObservable().startWith('')
  }
 
  setStep() {
    return this.step1.next('two')
  }
}
