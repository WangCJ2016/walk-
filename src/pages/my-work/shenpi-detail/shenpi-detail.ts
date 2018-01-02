import { Component, ViewChild, ElementRef, Renderer2  } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Refresher } from 'ionic-angular';
import { createObj } from '../../../domain'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/creatework.action'
import * as chatActions from '../../../actions/chat.action'
import { FormGroup, FormBuilder } from '@angular/forms'

import { applyType} from '../../../utils'
import {applyFlow} from '../../../domain'
/**
 * Generated class for the ShenpiDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shenpi-detail',
  templateUrl: 'shenpi-detail.html',
})
export class ShenpiDetailPage {
  @ViewChild(Content) content: Content;
  @ViewChild('dymanic') dymanic: ElementRef
  form: FormGroup
  form2: FormGroup
  segment = 'dynamic'
  params
  saturation: number = 0
  data: createObj = {}
  attach: Array<string>
  attachName: Array<string>
  applyType:string
  applyFlowList: Array<applyFlow>
  applyEmpIf: boolean = false
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
    private rd: Renderer2,
    private store$: Store<fromRoot.State>
  ) {
    this.params = this.navParams.data
    this.form = this.fb.group({
      remark: [''],
      attach:[''],
      applyId: [''],
      operate: [''],
      applyPerson: ['']
    })
    this.form2 = this.fb.group({
      submitContent: ['']
    })
    this.form2.get('submitContent').valueChanges.subscribe(res => {  
      if(res.keyboardHeight) {
        this.rd.setStyle(this.dymanic.nativeElement,'paddingBottom',res.keyboardHeight)
      }else{
        this.sendChat(res)
      }
     })
  }

  ionViewDidEnter() {
    if(this.navCtrl.getViews()[this.navCtrl.getViews().length-2].id === "CreateShenpiPage") {
      this.navCtrl.removeView(this.navCtrl.getViews()[this.navCtrl.getViews().length-2])
    }
    this.store$.dispatch(new chatActions.ChatListInitalAction({}))
    this.store$.dispatch(new actions.applyDetailAction({'applyId':this.params.id}))
    this.store$.dispatch(new actions.applyFlowAction({'applyId':this.params.id}))
    this.store$.dispatch(new chatActions.ChatListAction({parentId:this.params.id,pageNo:1}))
    this.store$.select(store=>store.creatwork).subscribe(v=>{
      this.data = v.workdetail
      this.applyFlowList = v.applyFlow
      if(this.data){
        this.store$.select(store=>store.auth.auth).subscribe(auth=>this.applyEmpIf = this.data.applyEmp.id === auth.emp.id)
        this.form.get('remark').patchValue(this.data.remark)
        this.attach = this.data.attach?this.data.attach.split(','):[]
        this.attachName = this.data.attachName?this.data.attachName.split(','):[]
        this.applyType = applyType(this.data.type, this.data.classify)
        
      }
    })
    this.store$.select(store=>store.chat).subscribe(v=>{
      
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
          this.content.scrollTo(0, this.content.scrollHeight+this.content.contentHeight+100)
        }
      }
      console.log(this.chatList)
    })
   
  }
  attachDel(i) {
    this.attach.splice(i,1)
  }
  close() {
    this.navCtrl.setPages([{page: 'WorkDeskPage'},{page:'MyWorkPage'}],{animate: true,direction:'back'})
  }
  operate(i) {
    this.store$.dispatch(new actions.applyUpdateAction({operate:i,'applyId':this.params.id}))
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
