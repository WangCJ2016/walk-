import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TermDailyPage } from './term-daily';
import { SharedModule } from '../../../app/shared.modules'
@NgModule({
  declarations: [
    TermDailyPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(TermDailyPage),
  ],
})
export class TermDailyPageModule {}
