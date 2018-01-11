import { Component, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import * as chatActions from '../../actions/chat.action'
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  @ViewChild('dymanic') dymanic: ElementRef
  params
  form2: FormGroup
  chatList = []
  enabled
  chatGroupId
  dymanicPageNo
  refresher
  dymanicPageTotal
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder,
    private rd: Renderer2,
    private store$: Store<fromRoot.State>
  ) {
    this.store$.dispatch( new chatActions.ChatListInitalAction({}))
    this.params = this.navParams.data
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
        }
        
        if(v.chatList.length-preLength==1) {
          this.content?this.content.resize():null
        }
      }
    })
  }
  
  ionViewDidEnter(){
    if(this.navCtrl.getViews()[this.navCtrl.getViews().length-2].id === "AddGroupPage") {
      this.navCtrl.removeView(this.navCtrl.getViews()[this.navCtrl.getViews().length-2])
    }
    this.store$.dispatch(new chatActions.ChatListAction({parentId: this.params.id}))
  }
  // 动态发送聊天信息
sendChat(obj) {
  this.store$.dispatch(new chatActions.sendChatAction({parentId:this.params.id,chatGroupId:this.chatGroupId,...obj}))
}
doRefresh(refresher) {
  this.refresher = refresher
  this.dymanicPageTotal++
  this.store$.dispatch(new chatActions.ChatListAction({parentId:this.params.id,pageNo:this.dymanicPageNo+1}))
}
}
