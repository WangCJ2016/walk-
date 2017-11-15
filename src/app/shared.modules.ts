import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular'
import { ComponentsModule } from '../components/components.module'
import { CityPickerModule } from  "ionic2-city-picker"
import { DirectivesModule } from '../directives/directives.module'



import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
    declarations: [
        TabsPage
    ],
    imports: [
        IonicModule,
        CityPickerModule,
        ComponentsModule,
        DirectivesModule,
    ],
    entryComponents: [
        TabsPage
    ],
    exports: [
        TabsPage,
        ComponentsModule,
        CityPickerModule,
        DirectivesModule,
    ]
})

export class SharedModule { }