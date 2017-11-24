import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, FormBuilder } from '@angular/forms'
import { ToastSitutionProvider  } from '../../../providers/toast-sitution/toast-sitution'
/**
 * Generated class for the CreateShenpiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-shenpi',
  templateUrl: 'create-shenpi.html',
})
export class CreateShenpiPage {
  form: FormGroup
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private toastProvider: ToastSitutionProvider
  ) {
    this.form = this.fb.group({
      fullName: [''],
      desc: [''],
      fujian: [{
        selectDoc: [],
        selectCamera: [],
        selectImages: []
      }],
      day: ['0.5'],
      startTime: [''],
      endTime: [''],
      money: [''],
      shenheren: [''],
      chaosongren: ['']
    })
  }
  
  onSubmit(f, ev: Event) {
    console.log(f.value)
    this.navCtrl.push('ShiwuDetailPage', {data: f.value})
  }
}
