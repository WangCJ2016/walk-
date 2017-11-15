import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkCommunityPage } from './work-community';

@NgModule({
  declarations: [
    WorkCommunityPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkCommunityPage),
  ],
  entryComponents: [
    WorkCommunityPage
  ]
})
export class WorkCommunityPageModule {}
