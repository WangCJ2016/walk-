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
/**
 * Generated class for the PlanyDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plany-detail',
  templateUrl: 'plany-detail.html',
})
export class PlanyDetailPage {
  @ViewChild(Content) content: Content;
  @ViewChild('dymanic') dymanic: ElementRef
  form: FormGroup
  form2: FormGroup
  segment = 'detail'
  params
  saturation: number = 0
  data: createObj = {}
  progress: string
  attach: Array<string>
  attachName: Array<string>
  month:string = ''
  zishiwuList: Array<zishiwu>
  requireList: Array<any> = []
  submitIf: boolean = false // 是否提交保存
  chatList: Array<any> = []
  chatGroupId: string
  dymanicPageNo = 0
  dymanicPageTotal = 1
  refresher: Refresher
  enabled: boolean = false
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder,
    private fileTranfer: FileTransfer,
    private alertCtrl: AlertController,
    private rd: Renderer2,
    @Inject('BASE_URL') private config,
    private store$: Store<fromRoot.State>
  ) {

    this.params = this.navParams.data
    this.form = this.fb.group({
      remark: [''],
      attach:[''],
      progress: [this.progress]
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

  ionViewDidEnter() {
    if(this.navCtrl.getViews()[this.navCtrl.getViews().length-2].id === "CreatePlanYPage") {
      this.navCtrl.removeView(this.navCtrl.getViews()[this.navCtrl.getViews().length-2])
    }
    this.store$.dispatch( new chatActions.ChatListInitalAction({}))
    this.store$.dispatch(new actions.getPlanYDetailAction({'planMonthId':this.params.id}))
    this.store$.dispatch(new actions.zishiwuAction({parentId:this.params.id,type:'5'}))
    this.store$.dispatch(new actions.requireListAction({parentId:this.params.id}))
    this.store$.dispatch(new chatActions.ChatListAction({parentId:this.params.id,pageNo:1}))
    this.store$.select(store=>store.creatwork).subscribe(v=>{
      console.log(v)
      this.data = v.workdetail
      this.zishiwuList = v.zishiwu
      this.requireList = v.requireList
      if(this.data){
        this.form.get('remark').patchValue(this.data.remark)
        this.progress = this.data.progress?this.data.progress:'0' 
        this.attach = this.data.attach?this.data.attach.split(','):[]
        this.attachName = this.data.attachName?this.data.attachName.split(','):[]
      }
    })
    this.store$.select(store=>store.chat).subscribe(v=>{
      console.log(v)
      if(v&&v.chatList.length>0&&v.chatList.length!=this.chatList.length) {
        const preLength = this.chatList.length
        this.enabled = true
        this.chatGroupId = v.chatList[0].chatGroupId
        this.chatList = v.chatList
        this.dymanicPageNo = v.chatList[0].pageNo
        this.refresher?this.refresher.complete():null
        
        if(this.dymanicPageTotal == v.chatList[0].totalPages) {
          this.enabled=false
          console.log(this.enabled)
        }
        
        if(v.chatList.length-preLength==1) {
          this.content.resize();
          this.content.scrollTo(0, this.content.scrollHeight+this.content.contentHeight)
        }
      }
    })
   
  }
  ionViewCanLeave() {
    
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
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
          
           this.store$.dispatch(new actions.addRequireAction({parentId: this.params.id, type:3,name: data.name}))
          }
        }
      ]
    }).present()
  
  }
  // 删除需求
  delRequire(id, index) {
    this.requireList.splice(index, 1)
    this.store$.dispatch(new actions.delRequireAction({resultsId: id,'planMonthId':this.params.id}))
  }
  // 创建子事务
  createzishiwu() {
    this.navCtrl.push('CreateWorkPage',{parentId:this.params.id,type:5})
  }
  // 关闭月计划
  endPlanz() {
    this.store$.dispatch(new actions.updateYAction({'status': '2','planMonthId':this.params.id}))
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
            this.store$.dispatch(new actions.updateYAction({...data,...{planMonthId:this.params.id}}))
            this.form.reset()
        })
    }else {
      this.store$.dispatch(new actions.updateYAction({...data,...{planMonthId:this.params.id}}))
    }
    this.submitIf = true
  }
// 动态发送聊天信息
sendChat(obj) {
  this.store$.dispatch(new chatActions.sendChatAction({parentId:'128fd57d36784e18862087138d188bf0',chatGroupId:this.chatGroupId,...obj}))
}
doRefresh(refresher) {
  this.refresher = refresher
  this.dymanicPageTotal++
  this.store$.dispatch(new chatActions.ChatListAction({parentId:'128fd57d36784e18862087138d188bf0',pageNo:this.dymanicPageNo+1}))
}
// 打开成果关联modal
requireModal(item) {
 this.navCtrl.push('RequireLinkPage', {item: item})
}
}
