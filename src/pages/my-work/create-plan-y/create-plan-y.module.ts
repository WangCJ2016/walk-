import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePlanYPage } from './create-plan-y';
import { SharedModule } from '../../../app/shared.modules'
@NgModule({
  declarations: [
    CreatePlanYPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(CreatePlanYPage),
  ],
})
export class CreatePlanYPageModule {}
