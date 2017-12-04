import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { createObj } from '../../../domain'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/creatework.action'
import { FormGroup, FormBuilder } from '@angular/forms'
import { FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
/**
 * Generated class for the ShiwuDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shiwu-detail',
  templateUrl: 'shiwu-detail.html',
})
export class ShiwuDetailPage {
  form: FormGroup
  segment = 'detail'
  params
  saturation: number = 0
  data:createObj = {}
  progress: string
  attach: Array<string>
  month:string = ''
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
      progress: [this.progress]
    })
   this.form.get('progress').valueChanges.subscribe(v=>this.progress=v)
  }

  ionViewDidLoad() {
    this.store$.dispatch(new actions.getWorkDetailAction({type: this.params.type,[this.params.type]:this.params.id}))
    this.store$.select(store=>store.creatwork.workdetail).subscribe(v=>{
      console.log(v)
      this.data = v
      if(this.data){
        this.progress = this.data.progress?this.data.progress:'0' 
        this.attach = this.data.attach?this.data.attach.split(','):[]
        this.month = this.data.year?this.data.year+'-'+this.data.month:''
      }
    })
   
  }
  attachDel(i) {
    this.attach.splice(i,1)
  }
  onSubmit(f, ev:Event) {
    
    let data = {}
    let attach = this.attach.slice()
    if(f.value.remark){
      data = {...data,remark:f.value.remark}
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
          attach.push(photo)
          resolve(photo)
        }, (err) => {
          // error
        }) 
       })
      
      })
     Promise.all(submitarr)
        .then(res => {
             data = {...data,attach:attach.join(',')}
            console.log(JSON.stringify(data))
            this.store$.dispatch(new actions.updateAction({...data,...{planWeekId:'c2a3a1b84e0a498193ce19745ff52d3a'}}))
            this.form.reset()
        })
    }
   
  }
}
