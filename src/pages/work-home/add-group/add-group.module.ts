import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddGroupPage } from './add-group';
import { SharedModule} from '../../../app/shared.modules'
@NgModule({
  declarations: [
    AddGroupPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(AddGroupPage),
  ],
})
export class AddGroupPageModule {}
