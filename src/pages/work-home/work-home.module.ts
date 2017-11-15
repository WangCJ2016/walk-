import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkHomePage } from './work-home';
@NgModule({
  declarations: [
    WorkHomePage,
  ],
  imports: [
    IonicPageModule.forChild(WorkHomePage),
  ],
  entryComponents:[
    WorkHomePage
  ]
})
export class WorkHomePageModule {}
