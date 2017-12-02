import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms'
import { ToastSitutionProvider  } from '../../../providers/toast-sitution/toast-sitution'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/creatework.action'
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
    private store$: Store<fromRoot.State>,
    private toastProvider: ToastSitutionProvider) {
      this.form = this.fb.group({
        fullName: [''],
        desc: [''],
        fujian: [''],
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
    this.store$.dispatch(new actions.planzsubmitAction({
      name: f.value.fullName,
      remark: f.value.desc,
      mainPerson: f.value.zhixingren.id,
      month: f.value.plan_month.split('-')[1],
      year: f.value.plan_month.split('-')[0],
      attach: f.value.fujian?f.value.fujian.map(res=>res.url).join(','):'',
      type: 'planMonthId'
    }))
  }
}
