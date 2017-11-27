import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberDailyPage } from './member-daily';
import { SharedModule } from '../../../app/shared.modules'

@NgModule({
  declarations: [
    MemberDailyPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(MemberDailyPage),
  ],
})
export class MemberDailyPageModule {}
