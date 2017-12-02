import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanyDetailPage } from './plany-detail';

@NgModule({
  declarations: [
    PlanyDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PlanyDetailPage),
  ],
})
export class PlanyDetailPageModule {}
