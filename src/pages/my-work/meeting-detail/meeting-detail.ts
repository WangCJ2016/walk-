import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { createObj } from '../../../domain'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/creatework.action'
import { FormGroup, FormBuilder } from '@angular/forms'
import { FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
/**
 * Generated class for the MeetingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meeting-detail',
  templateUrl: 'meeting-detail.html',
})
export class MeetingDetailPage {

  form: FormGroup
  segment = 'detail'
  params
  saturation: number = 0
  data: createObj = {}
  progress: string
  attach: Array<string>
  attachName: Array<string>
  month:string = ''
  zhujiangren
  canhuiren
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder,
    private fileTranfer: FileTransfer,
    @Inject('BASE_URL') private config,
    private store$: Store<fromRoot.State>
  ) {
    console.log(JSON.stringify(this.navParams.data))
    this.params = this.navParams.data
    this.form = this.fb.group({
      remark: [''],
      attach:[''],
      zhujiangren: [''],
      canhuiren: [''],
      progress: ['']
    })
   this.form.get('progress').valueChanges.subscribe(v=>this.progress=v)
  }

  ionViewDidLoad() {
    this.store$.dispatch(new actions.meetingDetailAction({'mettingId':this.params.id}))
    this.store$.select(store=>store.creatwork.workdetail).subscribe(v=>{
      console.log(v)
      this.data = v
      if(this.data){
        
        this.attach = this.data.attach?this.data.attach.split(','):[]
        this.attachName = this.data.attachName?this.data.attachName.split(','):[]
        this.zhujiangren = this.data.mainPerson?this.data.mainPerson:null
        this.canhuiren = this.data.empList?this.data.empList:null
        
      }
    })
   
  }
  attachDel(i) {
    this.attach.splice(i,1)
  }
  close() {
    this.navCtrl.setPages([{page: 'WorkDeskPage'},{page:'MyWorkPage'}],{animate: true,direction:'back'})
  }
  onSubmit(f, ev:Event) {
    console.log(f.value)
    let data = {}
    let attach = this.attach.slice()
    let attachName = this.attachName.slice()
    if(f.value.remark){
      data = {...data,remark:f.value.remark}
    }
    if(f.value.progress){
      data = {...data,progress:f.value.progress}
    }
    if(f.value.zhujiangren) {
      data = {...data,mainPerson:f.value.zhujiangren.id}
    }
    if(f.value.canhuiren) {
      data = {...data,empIds:f.value.canhuiren.map(res=>res.id).join(',')}
    }
    if(f.value.progress){
      data = {...data,progress:f.value.progress}
    }
    if(f.value.attach){
      const submitarr = f.value.attach.map((pic,index) => {
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
             data = {...data,attach:attach.join(','),attachName:attachName.join(',')}
            console.log(JSON.stringify(data))
            this.store$.dispatch(new actions.meetingUpdateAction({...data,...{'mettingId':this.params.id}}))
            this.form.reset()
        })
    }else {
      alert(1)
      this.store$.dispatch(new actions.meetingUpdateAction({...data,...{'mettingId':this.params.id}}))
    }
   
  }

}
