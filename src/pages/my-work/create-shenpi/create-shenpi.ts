import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/creatework.action'
import { ToastSitutionProvider  } from '../../../providers/toast-sitution/toast-sitution'

/**
 * Generated class for the CreateShenpiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface time {
  startDate:string
  startSx:string
  endDate:string
  endSx:string,
  days: number
}
@IonicPage()
@Component({
  selector: 'page-create-shenpi',
  templateUrl: 'create-shenpi.html',
})
export class CreateShenpiPage {
  form: FormGroup
  time:any
  todayFormat
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private toastProvider: ToastSitutionProvider,
    private fileTranfer: FileTransfer,
    @Inject('BASE_URL') private config,
    private store$: Store<fromRoot.State>,
  ) {
    this.form = this.fb.group({
      fullName: [''],
      desc: [''],
      fujian:[''],
      timeObj: [''],
      money: [''],
      shenheren: [''],
      chaosongren: ['']
    })
    this.form.get('timeObj').valueChanges.subscribe(v=>console.log(v))
    
  }
  
  onSubmit(f, ev: Event) {
   
    if(!f.value.fullName) {
      this.toastProvider.message('请选择审批类型')
      return
    }
    if(!f.value.desc) {
      this.toastProvider.message('请填写审批描述')
      return
    }

    
    if(f.value.fullName.type==2){
      this.toastProvider.message('请填写起借款金额')
      return
    }
    if(!f.value.shenheren) {
      this.toastProvider.message('请填写审批人')
      return
    }
   
    if(!f.value.chaosongren) {
      this.toastProvider.message('请填写抄送人')
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
            this.store$.dispatch(new actions.addapplyAction({
              type: f.value.fullName.type,
              classify: f.value.fullName.classify,
              reason: f.value.desc,
              startDate: f.value.timeObj.startDate,
              startSx: f.value.timeObj.startSx=='AM'?1:2,
              endDate: f.value.timeObj.endDate,
              // endSx: f.value.timeObj.endSx=='AM'?1:2,
              days: f.value.timeObj.day,
              money:f.value.money?f.value.money:'',
              attach: attach.join(','),
              attachName: attachName.join(','),
              applyPerson: f.value.shenheren.id,
              ccEmpIds:f.value.chaosongren.map(res=>res.id).join(','),
            }))
          
            this.form.reset()
        })
    }else{
      this.store$.dispatch(new actions.addapplyAction({
        type: f.value.fullName.type,
        classify: f.value.fullName.classify,
        reason: f.value.desc,
        startDate: f.value.timeObj.startDate,
        startSx: f.value.timeObj.startSx=='AM'?1:2,
        endDate: f.value.timeObj.endDate,
       // endSx: f.value.timeObj.endSx=='AM'?1:2,
        days: f.value.timeObj.day,
        money:f.value.money?f.value.money:'',
        applyPerson: f.value.shenheren.id,
        ccEmpIds:f.value.chaosongren.map(res=>res.id).join(','),
      }))
    }
  }
}
