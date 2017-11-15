import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkDeskPage } from './work-desk';
import { SharedModule} from '../../app/shared.modules'
@NgModule({
  declarations: [
    WorkDeskPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(WorkDeskPage),
  ],
  entryComponents: [
    WorkDeskPage
],
})
export class WorkDeskPageModule {}
