import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeAttencePage } from './change-attence';
import {SharedModule} from '../../../app/shared.modules'
@NgModule({
  declarations: [
    ChangeAttencePage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ChangeAttencePage),
  ],
})
export class ChangeAttencePageModule {}
