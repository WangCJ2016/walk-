import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangePasswordPage } from './change-password';
import { SharedModule} from '../../../app/shared.modules'
@NgModule({
  declarations: [
    ChangePasswordPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ChangePasswordPage),
  ],
})
export class ChangePasswordPageModule {}
