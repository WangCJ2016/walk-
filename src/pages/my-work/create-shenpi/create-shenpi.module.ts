import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateShenpiPage } from './create-shenpi';
import { SharedModule} from '../../../app/shared.modules'
@NgModule({
  declarations: [
    CreateShenpiPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(CreateShenpiPage),
  ],
})
export class CreateShenpiPageModule {}
