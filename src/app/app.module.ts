import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SharedModule } from './shared.modules'
import { HttpModule, JsonpModule } from '@angular/http';
import { AppStoreModule } from '../reducer'
import {  AppEffectsModule } from '../effects'
import { ProvidersModule } from '../providers'


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker'
import { Geolocation } from '@ionic-native/geolocation';
import { Keyboard } from '@ionic-native/keyboard';
import { File } from '@ionic-native/file';
import { FileTransfer} from '@ionic-native/file-transfer';

import { CityPickerProvider } from '../providers/city-picker/city-picker';
import { AuthProvider } from '../providers/auth/auth';

import { WorkHomePageModule } from '../pages/work-home/work-home.module'
import { WorkCommunityPageModule } from '../pages/work-community/work-community.module'
import { WorkDeskPageModule } from '../pages/work-desk/work-desk.module'
import { WorkContactPageModule } from '../pages/work-contact/work-contact.module'
import { WorkUsercenterPageModule } from '../pages/work-usercenter/work-usercenter.module'
import { ToastSitutionProvider } from '../providers/toast-sitution/toast-sitution';
import { TeamServiceProvider } from '../providers/team-service/team-service';
import { ContactServiceProvider } from '../providers/contact-service/contact-service';
import { AttenceServiceProvider } from '../providers/attence-service/attence-service';
import { DailyServiceProvider } from '../providers/daily-service/daily-service';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    WorkHomePageModule,
    WorkCommunityPageModule,
    WorkDeskPageModule,
    WorkContactPageModule,
    WorkUsercenterPageModule,
    HttpModule,
    JsonpModule,
    SharedModule,
    AppStoreModule,
    AppEffectsModule,
    ProvidersModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      iconMode: 'ios',
      backButtonIcon:'arrow-back',
      tabsHideOnSubPages: 'true',
      mode: 'ios' 
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    FileTransfer,
    File,
    Keyboard,
    Geolocation,
    ImagePicker,
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CityPickerProvider,
    AuthProvider,
    ToastSitutionProvider,
    {provide: 'BASE_URL', useValue: {url: 'http://106.15.103.123:8080/platform'}},
    TeamServiceProvider,
    ContactServiceProvider,
    AttenceServiceProvider,
    DailyServiceProvider
  ]
})
export class AppModule {}
