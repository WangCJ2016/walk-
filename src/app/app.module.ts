import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SharedModule } from './shared.modules'
import { HttpModule } from '@angular/http';
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

@NgModule({
  declarations: [
    MyApp,
    // WorkUsercenterPage,
    // WorkHomePage,
    // WorkCommunityPage,
    // WorkDeskPage,
    // WorkContactPage,
  ],
  imports: [
    WorkHomePageModule,
    WorkCommunityPageModule,
    WorkDeskPageModule,
    WorkContactPageModule,
    WorkUsercenterPageModule,
    HttpModule,
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
    AuthProvider
  ]
})
export class AppModule {}
