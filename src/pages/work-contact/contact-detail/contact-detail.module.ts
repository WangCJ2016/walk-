import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactDetailPage } from './contact-detail';
import { SharedModule} from '../../../app/shared.modules'
@NgModule({
  declarations: [
    ContactDetailPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ContactDetailPage),
  ],
})
export class ContactDetailPageModule {}
