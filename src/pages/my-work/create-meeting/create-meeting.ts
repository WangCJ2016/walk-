import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms'
import { ToastSitutionProvider  } from '../../../providers/toast-sitution/toast-sitution'
import { Store } from '@ngrx/store'
import { FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/creatework.action'
import { todayFormat } from '../../../utils'
import { Subscription } from 'rxjs/Subscription';
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
  auth
  todayFormat
  _sub$:Subscription
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private fb: FormBuilder,
     private fileTranfer: FileTransfer,
     @Inject('BASE_URL') private config,
     private store$: Store<fromRoot.State>,
     private toastProvider: ToastSitutionProvider) {
       this.form = this.fb.group({
        fullName: [''],
        desc: [''],
        fujian: [''],
        zhujiangren: [''],
        canhuiren: [''],
        meetingTime: ['']
       })
       this._sub$ = this.store$.select(store=>store.auth.auth).subscribe(res=>this.auth={
        name: res.name,
        id:res.emp.id,
        photo:res.photo
      })
      this.todayFormat = todayFormat()
  }  
  ionViewDidLeave(){
    this._sub$.unsubscribe()
  }
  onSubmit(f, ev: Event) {
    //this.navCtrl.push('MeetingDetailPage')
  
    if(!f.value.fullName) {
      this.toastProvider.message('请填写会议名称')
      return
    }
    if(!f.value.desc) {
      this.toastProvider.message('请填写会议描述信息')
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
    if(f.value.fujian){
      let attachName = []
      let attach = []
      const submitarr = f.value.fujian.map((pic,index) => {
      return new Promise((resolve, reject) => {
        const fileTransfer: FileTransferObject = this.fileTranfer.create();
        fileTransfer.upload(pic.url, `${this.config.url}/appPhotoUploadServlet`,{})
        .then((res) => {
          // success
          const photo = JSON.parse(res.response).fileUrl[0]
          attach.push(photo.url)
          attachName.push(photo.name)
          resolve(photo)
        }, (err) => {
          // error
        }) 
       })
      
      })
     Promise.all(submitarr)
        .then(res => {
            this.store$.dispatch(new actions.addMeetingAction({
              name: f.value.fullName,
              remark: f.value.desc,
              initator: this.auth.id,
              mainPerson: f.value.zhujiangren.id,
              empIds:f.value.canhuiren.map(res=>res.id).join(','),
              startDate: f.value.meetingTime.split('T')[0],
              startTime: f.value.meetingTime.split('T')[1].slice(0,-4),
              attach: attach.join(','),
              attachName: attachName.join(','),
            }))
          
            this.form.reset()
        })
    }else{
      this.store$.dispatch(new actions.addMeetingAction({
        name: f.value.fullName,
        remark: f.value.desc,
        initator: this.auth.id,
        mainPerson: f.value.zhujiangren.id,
        empIds:f.value.canhuiren.map(res=>res.id).join(','),
        startDate: f.value.meetingTime.split('T')[0],
        startTime: f.value.meetingTime.split('T')[1].slice(0,-4),
      }))
    }
    
  }
}
