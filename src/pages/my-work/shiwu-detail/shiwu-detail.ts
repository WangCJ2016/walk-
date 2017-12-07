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
  attachName: Array<string>
  zishiwuList: Array<zishiwu>
  requireList: Array<any> = []
  submitIf: boolean = false // 是否提交保存
  mainPersonIf: boolean
  initatorIf: boolean
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
      progress: [this.progress],
      zhubanren:['']
    })
   this.form.get('progress').valueChanges.subscribe(v=>this.progress=v)
  }

  ionViewDidEnter(){
    this.store$.dispatch(new actions.shiwuDetailAction({'thingId':this.params.id}))
    this.store$.dispatch(new actions.zishiwuAction({parentId:this.params.id,type:'2'}))
    this.store$.dispatch(new actions.requireListAction({parentId:this.params.id}))
    this.store$.select(store=>store.creatwork).subscribe(v=>{
      console.log(v)
      this.data = v.workdetail
      this.zishiwuList = v.zishiwu
      this.requireList = v.requireList
      if(this.data){
        this.progress = this.data.progress?this.data.progress:'0' 
        this.attach = this.data.attach?this.data.attach.split(','):[]
        this.store$.select(store=>store.auth).subscribe(auth => {
            this.mainPersonIf = auth.auth.emp.id == this.data.mainPersonId
            this.initatorIf = auth.auth.emp.id == this.data.initatorId
        })
      }
    })
    
  }
  back() {
    
    if(this.form.get('progress').value !== this.data.progress ||
    this.form.get('attach').value !== '' || 
    this.form.get('remark').value !== this.data.remark &&!this.submitIf) {
     let alert =  this.alertCtrl.create({
        title:'是否保存修改？',
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              this.navCtrl.setPages([{page:'WorkDeskPage'},{page:'MyWorkPage'}],{animate:true,direction:'back'})
            }
          },
          {
            text: '保存',
            handler: () => {
              this.onSubmit(this.form, event)
              this.navCtrl.setPages([{page:'WorkDeskPage'},{page:'MyWorkPage'}],{animate:true,direction:'back'})
            }
          }
        ]
      })
      alert.present()
    }else{
      this.navCtrl.setPages([{page:'WorkDeskPage'},{page:'MyWorkPage'}],{animate:true,direction:'back'})
    }
  }
  attachDel(i) {
    this.attach.splice(i,1)
  }
  // 添加需求
  createrequire() {
    this.alertCtrl.create({
      title: '创建需求',
      cssClass: 'xuqiu_alert',
      inputs: [
        {
          name: 'name',
          placeholder: '请填写需求名字'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
           console.log(data)
           this.requireList.push({name: data.name})
           this.store$.dispatch(new actions.addRequireAction({parentId: this.params.id, type:2,name: data.name}))
          }
        }
      ]
    }).present()
  
  }
  // 删除需求
  delRequire(id, index) {
    this.requireList.splice(index, 1)
    this.store$.dispatch(new actions.delRequireAction({resultsId: id,'thingId':this.params.id}))
  }
  // 创建子事务
  createzishiwu() {
    this.navCtrl.push('CreateWorkPage',{parentId:this.params.id,type:2})
  }
  // 关闭周计划
  endPlanz(status) {
    this.store$.dispatch(new actions.shiwuUpdateAction({'status': status,'thingId':this.params.id}))
  }
  // 删除子事务
  del(id,i) {
    this.zishiwuList.splice(i,1)
    this.store$.dispatch(new actions.zishiwuDelAction({thingId:id}))
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
    if(f.value.zhubanren){
      data = {...data,mainPerson:f.value.zhubanren.id}
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
            this.store$.dispatch(new actions.shiwuUpdateAction({...data,...{thingId:this.params.id}}))
            this.form.reset()
        })
    }else{
      this.store$.dispatch(new actions.shiwuUpdateAction({...data,...{thingId:this.params.id}}))
    }
   
  }
}
