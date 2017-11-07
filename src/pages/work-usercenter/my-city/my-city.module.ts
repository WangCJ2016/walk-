import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCityPage } from './my-city';

@NgModule({
  declarations: [
    MyCityPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCityPage),
  ],
})
export class MyCityPageModule {}
