import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShenpiPage } from './shenpi';
import { SharedModule} from '../../app/shared.modules'
@NgModule({
  declarations: [
    ShenpiPage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(ShenpiPage),
  ],
})
export class ShenpiPageModule {}
