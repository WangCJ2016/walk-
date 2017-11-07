import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShenpiDetailPage } from './shenpi-detail';

@NgModule({
  declarations: [
    ShenpiDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ShenpiDetailPage),
  ],
})
export class ShenpiDetailPageModule {}
