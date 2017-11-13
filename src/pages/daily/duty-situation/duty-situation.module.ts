import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DutySituationPage } from './duty-situation';
import { SharedModule } from '../../../app/shared.modules'
@NgModule({
  declarations: [
    DutySituationPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(DutySituationPage),
  ],
})
export class DutySituationPageModule {}
