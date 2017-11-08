import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { RoundRangeComponent } from './round-range/round-range';
import { BlankComponent } from './blank/blank';
import { DatePickerComponent } from './date-picker/date-picker';
import { GetVercodeComponent } from './get-vercode/get-vercode';
import { WorkHomePopverComponent } from './work-home-popver/work-home-popver';

@NgModule({
	declarations: [RoundRangeComponent,
    BlankComponent,
    DatePickerComponent,
    GetVercodeComponent,
    WorkHomePopverComponent,
    ],
    imports: [IonicModule],
    entryComponents:[WorkHomePopverComponent],
	exports: [RoundRangeComponent,
    BlankComponent,
    DatePickerComponent,
    GetVercodeComponent,
    WorkHomePopverComponent,
    ]
})
export class ComponentsModule {}
