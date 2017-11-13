import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateWorkPage } from './create-work';
import { SharedModule} from '../../../app/shared.modules'
@NgModule({
  declarations: [
    CreateWorkPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(CreateWorkPage),
  ],
})
export class CreateWorkPageModule {}
