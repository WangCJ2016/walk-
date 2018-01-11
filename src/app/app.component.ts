import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Store } from '@ngrx/store'
import * as fromRoot from '../reducer'
import * as actions from '../actions/auth.action'
@Component({
  templateUrl: 'app.html'


  
})
export class MyApp {
  @ViewChild('myNav') nav: NavController
  rootPage:any = TabsPage;

  constructor(
    platform: Platform,
    private statusBar: StatusBar,
    private store$: Store<fromRoot.State>,
    splashScreen: SplashScreen,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
       this.statusBar.overlaysWebView(true);
      // // set status bar to white
       this.statusBar.styleLightContent()
       splashScreen.hide();
      const userId = localStorage.getItem('userId')
      if(userId) {
        this.store$.dispatch(new actions.UserInfoAction({userId: userId}))
      }else{
        this.nav.push('LoginPage')
      }
      
    });
  }
}
