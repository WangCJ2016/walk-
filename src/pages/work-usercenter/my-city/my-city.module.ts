import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCityPage } from './my-city';
import { SharedModule} from '../../../app/shared.modules'

@NgModule({
  declarations: [
    MyCityPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(MyCityPage),
  ],
})
export class MyCityPageModule {}
