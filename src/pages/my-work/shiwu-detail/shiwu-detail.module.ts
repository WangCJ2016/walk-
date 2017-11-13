import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShiwuDetailPage } from './shiwu-detail';
import { SharedModule} from '../../../app/shared.modules'
@NgModule({
  declarations: [
    ShiwuDetailPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ShiwuDetailPage),
  ],
})
export class ShiwuDetailPageModule {}
