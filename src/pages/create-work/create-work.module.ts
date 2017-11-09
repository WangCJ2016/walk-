import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateWorkPage } from './create-work';

@NgModule({
  declarations: [
    CreateWorkPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateWorkPage),
  ],
})
export class CreateWorkPageModule {}
