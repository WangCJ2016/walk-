import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyPage } from './daily';
import { SharedModule } from '../../app/shared.modules'
@NgModule({
  declarations: [
    DailyPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(DailyPage),
  ],
})
export class DailyPageModule {}
