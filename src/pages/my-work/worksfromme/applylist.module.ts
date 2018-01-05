import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplylistPage } from './applylist';
import { SharedModule} from '../../../app/shared.modules'
@NgModule({
  declarations: [
    ApplylistPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ApplylistPage),
  ],
})
export class ApplylistPageModule {}
