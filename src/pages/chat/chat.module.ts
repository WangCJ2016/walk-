import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';
import { SharedModule} from '../../app/shared.modules'
@NgModule({
  declarations: [
    ChatPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ChatPage),
  ],
})
export class ChatPageModule {}
