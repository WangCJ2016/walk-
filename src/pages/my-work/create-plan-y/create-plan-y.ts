import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms'
import { ToastSitutionProvider  } from '../../../providers/toast-sitution/toast-sitution'
/**
 * Generated class for the CreatePlanYPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-plan-y',
  templateUrl: 'create-plan-y.html',
})
export class CreatePlanYPage {
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
        plan_month: ['']
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePlanYPage');
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
    if(!f.value.plan_month) {
      this.toastProvider.message('请填写月份')
      return
    }
    this.navCtrl.push('ShiwuDetailPage', {data: f.value})
  }
}
