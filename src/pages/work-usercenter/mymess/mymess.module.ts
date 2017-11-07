import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MymessPage } from './mymess';

@NgModule({
  declarations: [
    MymessPage,
  ],
  imports: [
    IonicPageModule.forChild(MymessPage),
  ],
})
export class MymessPageModule {}
