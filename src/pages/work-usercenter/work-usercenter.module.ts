import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkUsercenterPage } from './work-usercenter'

@NgModule({
  declarations: [
    WorkUsercenterPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkUsercenterPage),
  ],
  entryComponents: [
    WorkUsercenterPage
  ]
})
export class WorkUsercenterPageModule {}