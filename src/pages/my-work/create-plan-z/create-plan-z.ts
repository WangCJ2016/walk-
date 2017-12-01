import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms'
import { ToastSitutionProvider  } from '../../../providers/toast-sitution/toast-sitution'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/creatework.action'
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
    private toastProvider: ToastSitutionProvider,
    private store$: Store<fromRoot.State>
  ) {
      this.form = this.fb.group({
        fullName: [''],
        desc: [''],
        fujian: [''],
        zhixingren: [''],
        endTime: [''],
        startTime: ['']
      })
      this.form.get('fujian').valueChanges.subscribe(res => console.log(res))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePlanZPage');
  }
  onSubmit(f, ev: Event) {
    // console.log(JSON.stringify(f.value))
    // if(!f.value.fullName) {
    //   this.toastProvider.message('请填写会议名称')
    //   return
    // }
    // if(!f.value.zhixingren) {
    //   this.toastProvider.message('请填写执行人')
    //   return
    // }
    // if(!f.value.startTime) {
    //   this.toastProvider.message('请填写起始时间')
    //   return
    // }
    // if(!f.value.endTime) {
    //   this.toastProvider.message('请填写截止时间')
    //   return
    // }
    // this.store$.dispatch(new actions.planzsubmitAction({
    //   name: f.value.fullName,
    //   remark: f.value.desc,
    //   mainPerson: f.value.zhixingren.id,
    //   startDate: f.value.startTime,
    //   endDate: f.value.endTime,
    //   attach: f.value.fujian?f.value.fujian.map(res=>res.url).join(','):''
    // }))
    this.navCtrl.push('ShiwuDetailPage')
  }
}
