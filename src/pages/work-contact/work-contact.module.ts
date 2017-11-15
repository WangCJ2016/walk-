import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkContactPage } from './work-contact';

@NgModule({
  declarations: [
    WorkContactPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkContactPage),
  ],
  entryComponents: [
    WorkContactPage
  ]
})
export class WorkContactPageModule {}
