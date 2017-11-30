import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttenceRecordePage } from './attence-recorde';
import { SharedModule } from '../../../app/shared.modules';
@NgModule({
  declarations: [
    AttenceRecordePage,
  ],
  imports: [
    IonicPageModule.forChild(AttenceRecordePage),
    SharedModule
  ],
  exports: [
    AttenceRecordePage
  ]
})
export class AttenceRecordePageModule {}
