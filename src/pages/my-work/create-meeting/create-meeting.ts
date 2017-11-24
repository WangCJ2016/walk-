import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms'
import { ToastSitutionProvider  } from '../../../providers/toast-sitution/toast-sitution'
/**
 * Generated class for the CreateMeetingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-meeting',
  templateUrl: 'create-meeting.html',
})
export class CreateMeetingPage {
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
        faqiren: [''],
        zhujiangren: [''],
        canhuiren: [''],
        meetingTime: ['']
       })
  }  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateMeetingPage');
  }
  onSubmit(f, ev: Event) {
    if(!f.value.fullName) {
      this.toastProvider.message('请填写会议名称')
      return
    }
    if(!f.value.faqiren) {
      this.toastProvider.message('请填写发起人')
      return
    }
    if(!f.value.zhujiangren) {
      this.toastProvider.message('请填写主讲人')
      return
    }
    if(!f.value.canhuiren) {
      this.toastProvider.message('请填写参与人')
      return
    }
    if(!f.value.meetingTime) {
      this.toastProvider.message('请填写会议时间')
      return
    }
     this.navCtrl.push('ShiwuDetailPage', {data: f.value})
  }
}
