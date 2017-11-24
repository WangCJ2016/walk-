import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms'
import { ToastSitutionProvider  } from '../../../providers/toast-sitution/toast-sitution'
/**
 * Generated class for the CreatePlanZPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-plan-z',
  templateUrl: 'create-plan-z.html',
})
export class CreatePlanZPage {
  form: FormGroup
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private toastProvider: ToastSitutionProvider) {
      this.form = this.fb.group({
        fullName: [''],
        desc: [''],
        fujian: [{
          selectDoc: [],
          selectCamera: [],
          selectImages: []
        }],
        zhixingren: [''],
        endTime: [''],
        startTime: ['']
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePlanZPage');
  }
  onSubmit(f, ev: Event) {
    if(!f.value.fullName) {
      this.toastProvider.message('请填写会议名称')
      return
    }
    if(!f.value.zhixingren) {
      this.toastProvider.message('请填写执行人')
      return
    }
    if(!f.value.startTime) {
      this.toastProvider.message('请填写起始时间')
      return
    }
    if(!f.value.endTime) {
      this.toastProvider.message('请填写截止时间')
      return
    }
    this.navCtrl.push('ShiwuDetailPage', {data: f.value})
  }
}
