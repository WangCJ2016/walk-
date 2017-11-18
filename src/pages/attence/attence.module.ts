import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttencePage } from './attence';
import { SharedModule } from '../../app/shared.modules'
@NgModule({
  declarations: [
    AttencePage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(AttencePage),
  ],
})
export class AttencePageModule {}
