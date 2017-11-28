import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MymessPage } from './mymess';
import { SharedModule } from '../../../app/shared.modules'
@NgModule({
  declarations: [
    MymessPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(MymessPage),
  ],
})
export class MymessPageModule {}
