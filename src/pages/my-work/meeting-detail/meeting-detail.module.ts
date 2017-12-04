import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeetingDetailPage } from './meeting-detail';
import { SharedModule} from '../../../app/shared.modules'
@NgModule({
  declarations: [
    MeetingDetailPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(MeetingDetailPage),
  ],
})
export class MeetingDetailPageModule {}
