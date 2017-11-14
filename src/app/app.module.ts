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
import { CityPickerProvider } from '../providers/city-picker/city-picker';
import { AuthProvider } from '../providers/auth/auth';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
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
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CityPickerProvider,
    AuthProvider
  ]
})
export class AppModule {}
