import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanzDetailPage } from './planz-detail';
import { SharedModule} from '../../../app/shared.modules'
@NgModule({
  declarations: [
    PlanzDetailPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(PlanzDetailPage),
  ],
})
export class PlanzDetailPageModule {}
