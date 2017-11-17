import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkContactPage } from './work-contact';
import { SharedModule } from '../../app/shared.modules'

@NgModule({
  declarations: [
    WorkContactPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(WorkContactPage),
  ],
  entryComponents: [
    WorkContactPage
  ]
})
export class WorkContactPageModule {}
