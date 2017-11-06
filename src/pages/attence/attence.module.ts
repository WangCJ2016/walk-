import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttencePage } from './attence';

@NgModule({
  declarations: [
    AttencePage,
  ],
  imports: [
    IonicPageModule.forChild(AttencePage),
  ],
})
export class AttencePageModule {}
