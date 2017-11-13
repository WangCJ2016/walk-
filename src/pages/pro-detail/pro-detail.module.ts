import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProDetailPage } from './pro-detail';
import { SharedModule } from '../../app/shared.modules'
@NgModule({
  declarations: [
    ProDetailPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ProDetailPage),
  ],
})
export class ProDetailPageModule {}
