import { Component,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms'
import { FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
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
    private fileTranfer: FileTransfer,
    private toastProvider: ToastSitutionProvider,
    @Inject('BASE_URL') private config,
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
    // this.navCtrl.push('PlanzDetailPage')
    if(!f.value.fullName) {
      this.toastProvider.message('请填写会议名称')
      return
    }
    if(!f.value.desc) {
      this.toastProvider.message('请填写描述信息')
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
            this.store$.dispatch(new actions.planzsubmitAction({
              name: f.value.fullName,
              remark: f.value.desc,
              mainPerson: f.value.zhixingren.id,
              startDate: f.value.startTime,
              endDate: f.value.endTime,
              attach: attach.join(','),
              attachName: attachName.join(','),
            }))
          
            this.form.reset()
        })
    }else{
      this.store$.dispatch(new actions.planzsubmitAction({
        name: f.value.fullName,
        remark: f.value.desc,
        mainPerson: f.value.zhixingren.id,
        startDate: f.value.startTime,
        endDate: f.value.endTime,
      }))
    }
    
    //this.navCtrl.push('ShiwuDetailPage')
  }
}
