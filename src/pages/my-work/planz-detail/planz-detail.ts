import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { createObj } from '../../../domain'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/creatework.action'
import { FormGroup, FormBuilder } from '@angular/forms'
import { FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import { zishiwu } from '../../../domain'
/**
 * Generated class for the PlanzDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-planz-detail',
  templateUrl: 'planz-detail.html',
})
export class PlanzDetailPage {

  form: FormGroup
  segment = 'detail'
  params
  saturation: number = 0
  data: createObj = {}
  progress: string
  attach: Array<string>
  attachName: Array<string>
  month:string = ''
  zishiwuList: Array<zishiwu>
  submitIf: boolean = false // 是否提交保存
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder,
    private fileTranfer: FileTransfer,
    private alertCtrl: AlertController,
    @Inject('BASE_URL') private config,
    private store$: Store<fromRoot.State>
  ) {
    this.params = this.navParams.data
    this.form = this.fb.group({
      remark: [''],
      attach:[''],
      progress: [this.progress]
    })
   this.form.get('progress').valueChanges.subscribe(v=>this.progress=v)
  
   
  }

  
  ionViewDidEnter() {

    this.store$.dispatch(new actions.getWorkDetailAction({'planWeekId':this.params.id}))
    this.store$.dispatch(new actions.zishiwuAction({parentId:this.params.id,type:'4'}))
    this.store$.select(store=>store.creatwork).subscribe(v=>{
      console.log(v)
      this.data = v.workdetail
      this.zishiwuList = v.zishiwu
      if(this.data){
        this.progress = this.data.progress?this.data.progress:'0' 
        this.attach = this.data.attach?this.data.attach.split(','):[]
        this.attachName = this.data.attachName?this.data.attachName.split(','):[]
      }
    })
  }
  back() {
    this.navCtrl.setPages([{page:'WorkDeskPage'},{page:'MyWorkPage'}],{animate:true,direction:'back'})
  }
  ionViewCanLeave() {
  
    if(this.form.get('progress').value !== this.data.progress ||
    this.form.get('attach').value !== this.data.attach || 
    this.form.get('remark').value !== this.data.remark &&!this.submitIf) {
     let alert =  this.alertCtrl.create({
        title:'是否保存修改？',
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              return true
            }
          },
          {
            text: '保存',
            handler: () => {
              this.onSubmit(this.form, event)
              return true
            }
          }
        ]
      })
     
    }
 
  }
  attachDel(i) {
    this.attach.splice(i,1)
  }
  // 创建子事务
  createzishiwu() {
    this.navCtrl.push('CreateWorkPage',{parentId:this.params.id,type:4})
  }
  // 关闭周计划
  endPlanz() {
    console.log(this.data)
    // this.store$.dispatch(new actions.updateAction({'status': '2'}))
    // this.submitIf = true
  }
  // 删除子事务
  del(id,i) {
    this.zishiwuList.splice(i,1)
    this.store$.dispatch(new actions.zishiwuDelAction({thingId:id}))
  }
  // 保存修改
  onSubmit(f, ev:Event) {
    
    let data = {}
    let attach = this.attach.slice()
    let attachName = this.attachName.slice()
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
            this.store$.dispatch(new actions.updateAction({...data,...{'planWeekId':this.params.id}}))
            this.form.reset()
        })
    }else {
      this.store$.dispatch(new actions.updateAction({...data,...{'planWeekId':this.params.id}}))
    }
    this.submitIf = true
  }

}
