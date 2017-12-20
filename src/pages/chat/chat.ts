import { Component, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import * as actions from '../../actions/chat.action'
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
    this.params = this.navParams.data
    console.log(this.params)
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

  ionViewDidEnter(){
    this.store$.dispatch(new actions.ChatListAction({parentId: this.params.id}))
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
}
