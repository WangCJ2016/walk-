import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { RoundRangeComponent } from './round-range/round-range';
import { BlankComponent } from './blank/blank';
import { DatePickerComponent } from './date-picker/date-picker';
import { GetVercodeComponent } from './get-vercode/get-vercode';
import { WorkHomePopverComponent } from './work-home-popver/work-home-popver';
import { CreateWorkPopoverComponent } from './create-work-popover/create-work-popover';
import { SelectPersonComponent } from './select-person/select-person';
import { AvatarComponent } from './avatar/avatar';
import { SelectModalComponent } from './select-modal/select-modal';
import { FixTopComponent } from './fix-top/fix-top';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password';
import { MapComponent } from './map/map';
import { FooterInputComponent } from './footer-input/footer-input';
import { FileModalComponent } from './file-modal/file-modal';
import { FujianFormcontrolComponent } from './fujian-formcontrol/fujian-formcontrol';
import { InitalmemberFormcontrolComponent } from './initalmember-formcontrol/initalmember-formcontrol';
import { CountComponent } from './count/count';
import { ShenpitypeFormcontrolComponent } from './shenpitype-formcontrol/shenpitype-formcontrol';


@NgModule({
	declarations: [RoundRangeComponent,
    BlankComponent,
    DatePickerComponent,
    GetVercodeComponent,
    WorkHomePopverComponent,
    CreateWorkPopoverComponent,
    SelectPersonComponent,
    AvatarComponent,
    SelectModalComponent,
    FixTopComponent,
    ConfirmPasswordComponent,
    MapComponent,
    FooterInputComponent,
    FileModalComponent,
    FujianFormcontrolComponent,
    InitalmemberFormcontrolComponent,
    CountComponent,
    ShenpitypeFormcontrolComponent,
    ],
    imports: [IonicModule],
    entryComponents:[FileModalComponent,WorkHomePopverComponent,CreateWorkPopoverComponent,SelectPersonComponent,AvatarComponent,SelectModalComponent],
	exports: [RoundRangeComponent,
    BlankComponent,
    DatePickerComponent,
    GetVercodeComponent,
    WorkHomePopverComponent,
    CreateWorkPopoverComponent,
    SelectPersonComponent,
    AvatarComponent,
    SelectModalComponent,
    FixTopComponent,
    ConfirmPasswordComponent,
    MapComponent,
    FooterInputComponent,
    FileModalComponent,
    FujianFormcontrolComponent,
    InitalmemberFormcontrolComponent,
    CountComponent,
    ShenpitypeFormcontrolComponent,
    ]
})
export class ComponentsModule {}
