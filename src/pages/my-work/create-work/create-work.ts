import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { SelectPersonComponent } from '../../../components/select-person/select-person'
import { FormGroup, FormBuilder } from '@angular/forms'
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
import { ToastSitutionProvider } from '../../../providers/toast-sitution/toast-sitution'
/**
 * Generated class for the CreateWorkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-work',
  templateUrl: 'create-work.html',
})
export class CreateWorkPage {
  form: FormGroup
  startDate: string
  endDate: string
  constructor(public modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private toastProvider: ToastSitutionProvider,
    private fb: FormBuilder) {
      this.form = this.fb.group({
        fullName: [''],
        desc: [''],
        fujian: [{
          selectDoc: [],
          selectCamera: [],
          selectImages: []
        }],
        faqiren: [''],
        zhubanren: [''],
        startTime: [''],
        endTime: ['']
      })
      this.form.get('fujian').valueChanges.subscribe(res => console.log('fujian'+ JSON.stringify(res)))
      this.form.get('faqiren').valueChanges.subscribe(res => console.log('fujian'+ JSON.stringify(res)))
      this.form.get('startTime').valueChanges.subscribe(res => console.log('fujian'+ JSON.stringify(res)))
  }

  
  validate(c):{[key: string]:any} {
    console.log(c.value)
    if(c.value.oldpassword !== c.value.confirmpassword) {
      return null
    }
    return {
      valid: true
    }
  }
  presentModal() {
    let profileModal = this.modalCtrl.create(SelectPersonComponent, { userId: 8675309 });
    profileModal.present();
  }
  onSubmit(f, ev: Event) {
    if(!f.value.fullName) {
      this.toastProvider.message('请填写项目名称')
      return
    }
    if(!f.value.faqiren) {
      this.toastProvider.message('请填写发起人')
      return
    }
    if(!f.value.zhubanren) {
      this.toastProvider.message('请填写主办人')
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
    if(differenceInCalendarDays(new Date(f.value.startTime), new Date(f.value.endTime)) > 0) {
      this.toastProvider.message('截止时间必须大于起始时间')
      return
    }
    this.navCtrl.push('ShiwuDetailPage', {data: f.value})
  }
  
}
