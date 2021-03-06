import { Component, Inject, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Content, Refresher } from 'ionic-angular';
import { createObj } from '../../../domain'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/creatework.action'
import * as chatActions from '../../../actions/chat.action'
import { FormGroup, FormBuilder } from '@angular/forms'
import { FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import { zishiwu } from '../../../domain'
import { Subscription } from 'rxjs/Subscription';

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
  @ViewChild(Content) content: Content;
  @ViewChild('dymanic') dymanic: ElementRef
  
  form: FormGroup
  form2: FormGroup
  segment = 'dymanic'
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
  chatList: Array<any> = []
  chatGroupId: string
  dymanicPageNo = 0
  dymanicPageTotal = 1
  refresher: Refresher
  enabled: boolean = false

  _sub$:Subscription
  _sub1$:Subscription
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder,
    private rd: Renderer2,
    private fileTranfer: FileTransfer,
    private alertCtrl: AlertController,
    @Inject('BASE_URL') private config,
    private store$: Store<fromRoot.State>
  ) {
   
    this.params = this.navParams.data
    this.form = this.fb.group({
      remark: [''],
      attach:[''],
      progress: [''],
      zhubanren:['']
    })
    this.form2 = this.fb.group({
      submitContent: ['']
    })
   this.form.get('progress').valueChanges.subscribe(v=>this.progress=v)
   this.form2.get('submitContent').valueChanges.subscribe(res => {  
    if(res.keyboardHeight) {
      this.rd.setStyle(this.dymanic.nativeElement,'paddingBottom',res.keyboardHeight)
    }else{
      this.sendChat(res)
    }
   })
  }

  ionViewDidEnter(){  
    //this.navbar.backButtonClick = this.back
    if(this.navCtrl.getViews()[this.navCtrl.getViews().length-2].id === "CreateWorkPage"&&this.navCtrl.getViews()[this.navCtrl.getViews().length-3].id !== "ShiwuDetailPage") {
      this.navCtrl.removeView(this.navCtrl.getViews()[this.navCtrl.getViews().length-2])
    }
    this.store$.dispatch( new chatActions.ChatListInitalAction({}))
    this.store$.dispatch(new actions.shiwuDetailAction({'thingId':this.params.id}))
    this.store$.dispatch(new actions.zishiwuAction({parentId:this.params.id,type:'2'}))
    this.store$.dispatch(new actions.requireListAction({parentId:this.params.id}))
    this.store$.dispatch(new chatActions.ChatListAction({parentId:this.params.id,pageNo:1}))
    this._sub$ = this.store$.select(store=>store.creatwork).subscribe(v=>{
      this.data = v.workdetail
      this.zishiwuList = v.zishiwu
      this.requireList = v.requireList
      if(this.data){
        this.form.get('remark').patchValue(this.data.remark)
        this.data.progress?this.data.progress:'0' 
        this.progress = this.data.progress
        this.attach = this.data.attach?this.data.attach.split(','):[]
        this.store$.select(store=>store.auth).subscribe(auth => {
          if(auth.auth.emp) {
            this.mainPersonIf = auth.auth.emp.id == this.data.mainPersonId
            this.initatorIf = auth.auth.emp.id == this.data.initatorId
          }
        })
      }
    })
    this._sub1$ = this.store$.select(store=>store.chat).subscribe(v=>{
      if(v&&v.chatList.length>0&&v.chatList.length!=this.chatList.length) {
        this.enabled = true
        this.chatGroupId = v.chatList[0].chatGroupId
        this.chatList = v.chatList
        this.dymanicPageNo = v.chatList[0].pageNo
        this.refresher?this.refresher.complete():null
        
        if(this.dymanicPageTotal == v.chatList[0].totalPages) {
          this.enabled=false
        }
        
       
      }
    })
  }
  
  ionViewCanLeave() {
    this._sub$.unsubscribe()
    this._sub1$.unsubscribe()
    if(this.form.get('progress').value !== this.data.progress ||
    this.form.get('attach').value !== '' || 
    this.form.get('remark').value !== this.data.remark ) {
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
      alert.present()
    }else{
      return true
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
           
          }
        },
        {
          text: '确定',
          handler: data => {
         
          
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
// 动态发送聊天信息
sendChat(obj) {
  if((obj.contents&&obj.contents!='')||(obj.attach&&obj.attach!='')){
    this.store$.dispatch(new chatActions.sendChatAction({parentId:this.params.id,chatGroupId:this.chatGroupId,...obj}))
  }
  
}
doRefresh(refresher) {
  this.refresher = refresher
  this.dymanicPageTotal++
  this.store$.dispatch(new chatActions.ChatListAction({parentId:this.params.id,pageNo:this.dymanicPageNo+1}))
}
// 打开成果关联modal
requireModal(item) {
 this.navCtrl.push('RequireLinkPage', {item: item})
}
}
