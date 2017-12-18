import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkHomePage } from './work-home';
import { SharedModule} from '../../app/shared.modules'
@NgModule({
  declarations: [
    WorkHomePage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(WorkHomePage),
  ],
  entryComponents:[
    WorkHomePage
  ]
})
export class WorkHomePageModule {}
