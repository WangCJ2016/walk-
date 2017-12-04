import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanyDetailPage } from './plany-detail';
import { SharedModule } from '../../../app/shared.modules'
@NgModule({
  declarations: [
    PlanyDetailPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(PlanyDetailPage),
  ],
})
export class PlanyDetailPageModule {}
