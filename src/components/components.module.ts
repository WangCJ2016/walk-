import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { RoundRangeComponent } from './round-range/round-range';
import { BlankComponent } from './blank/blank';
import { DatePickerComponent } from './date-picker/date-picker';
@NgModule({
	declarations: [RoundRangeComponent,
    BlankComponent,
    DatePickerComponent],
	imports: [IonicModule],
	exports: [RoundRangeComponent,
    BlankComponent,
    DatePickerComponent]
})
export class ComponentsModule {}
