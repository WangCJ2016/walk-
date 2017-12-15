import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequireLinkPage } from './require-link';

@NgModule({
  declarations: [
    RequireLinkPage,
  ],
  imports: [
    IonicPageModule.forChild(RequireLinkPage),
  ],
})
export class RequireLinkPageModule {}
