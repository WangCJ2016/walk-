import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePlanZPage } from './create-plan-z';
import { SharedModule } from '../../../app/shared.modules'
@NgModule({
  declarations: [
    CreatePlanZPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(CreatePlanZPage),
  ],
})
export class CreatePlanZPageModule {}
