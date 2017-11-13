import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateMeetingPage } from './create-meeting';
import { SharedModule} from '../../../app/shared.modules'
@NgModule({
  declarations: [
    CreateMeetingPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(CreateMeetingPage),
  ],
})
export class CreateMeetingPageModule {}
