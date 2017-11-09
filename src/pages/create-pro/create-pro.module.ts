import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateProPage } from './create-pro';

@NgModule({
  declarations: [
    CreateProPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateProPage),
  ],
})
export class CreateProPageModule {}
