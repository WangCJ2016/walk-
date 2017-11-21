import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShenpiDetailPage } from './shenpi-detail';
import { SharedModule } from '../../../app/shared.modules'
@NgModule({
  declarations: [
    ShenpiDetailPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ShenpiDetailPage),
  ],
})
export class ShenpiDetailPageModule {}
