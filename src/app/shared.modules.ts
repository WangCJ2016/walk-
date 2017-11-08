import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular'
import { ComponentsModule } from '../components/components.module'
import { CityPickerModule } from  "ionic2-city-picker"

import { WorkHomePage } from '../pages/work-home/work-home'
import { WorkCommunityPage } from '../pages/work-community/work-community'
import { WorkDeskPage } from '../pages/work-desk/work-desk'
import { WorkContactPage } from '../pages/work-contact/work-contact'
import { WorkUsercenterPage } from '../pages/work-usercenter/work-usercenter'
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
    declarations: [
        WorkHomePage,
        WorkCommunityPage,
        WorkDeskPage,
        WorkContactPage,
        WorkUsercenterPage,
        TabsPage
    ],
    imports: [
        IonicModule,
        CityPickerModule,
        ComponentsModule
    ],
    entryComponents: [
        WorkHomePage,
        WorkCommunityPage,
        WorkDeskPage,
        WorkContactPage,
        WorkUsercenterPage,
        TabsPage
    ],
    exports: [
        WorkHomePage,
        WorkCommunityPage,
        WorkDeskPage,
        WorkContactPage,
        WorkUsercenterPage,
        TabsPage,
        ComponentsModule,
        CityPickerModule
    ]
})

export class SharedModule { }