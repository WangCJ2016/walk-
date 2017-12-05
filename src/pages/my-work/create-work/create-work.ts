import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { SelectPersonComponent } from '../../../components/select-person/select-person'
import { FormGroup, FormBuilder } from '@angular/forms'
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
import { ToastSitutionProvider } from '../../../providers/toast-sitution/toast-sitution'
import { Store } from '@ngrx/store'
import { FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/creatework.action'
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
  params
  form: FormGroup
  startDate: string
  endDate: string
  constructor(public modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private toastProvider: ToastSitutionProvider,
    private fileTranfer: FileTransfer,
    @Inject('BASE_URL') private config,
    private store$: Store<fromRoot.State>,
    private fb: FormBuilder) {
      this.params = this.navParams.data
      this.form = this.fb.group({
        fullName: [''],
        desc: [''],
        fujian: [''],
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
    //this.navCtrl.push('ShiwuDetailPage')
    if(!f.value.fullName) {
      this.toastProvider.message('请填写项目名称')
      return
    }
    if(!f.value.desc) {
      this.toastProvider.message('请填写事务描述')
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
            this.store$.dispatch(new actions.addShiwuAction({
              name: f.value.fullName,
              remark: f.value.desc,
              initator: f.value.faqiren.id,
              mainPerson: f.value.zhubanren.id,
              startDate: f.value.startTime,
              endDate: f.value.endTime,
              attach: attach.join(','),
              attachName: attachName.join(','),
              ...this.params
            }))
          
            this.form.reset()
        })
    }else{

      this.store$.dispatch(new actions.addShiwuAction({
        name: f.value.fullName,
        remark: f.value.desc,
        initator: f.value.faqiren.id,
        mainPerson: f.value.zhubanren.id,
        startDate: f.value.startTime,
        endDate: f.value.endTime,
        ...this.params
      })) 
      this.form.reset()
    }
  }
  
}
