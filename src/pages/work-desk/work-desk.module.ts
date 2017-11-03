import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkDeskPage } from './work-desk';

@NgModule({
  declarations: [
    WorkDeskPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkDeskPage),
  ],
})
export class WorkDeskPageModule {}
