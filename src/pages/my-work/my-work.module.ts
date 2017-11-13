import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyWorkPage } from './my-work';
import { SharedModule } from '../../app/shared.modules'
@NgModule({
  declarations: [
    MyWorkPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(MyWorkPage),
  ],
})
export class MyWorkPageModule {}
