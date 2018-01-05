import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Loading, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable'

import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducer'
import * as actions from '../../actions/auth.action'
import { Subscription } from 'rxjs/Subscription';

/**
 * Generated class for the WorkUsercenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-work-usercenter',
  templateUrl: 'work-usercenter.html',
})
export class WorkUsercenterPage {
  token: string
  name: string = '登录/注册'
  authImage: Observable<string>
  loading:  Loading
  loadremoveIf: boolean = false
  _sub$:Subscription
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private load: LoadingController,
    private alert: AlertController,
    private store$: Store<fromRoot.State>) {
      this.loading = this.load.create({
        dismissOnPageChange:true,
        duration:5000
      })
      
      this.authImage = this.store$.select(state => state.auth.auth.photo)
      this._sub$ = this.store$.select(state => state.auth.auth).subscribe(auth => {
        
        if(this.loadremoveIf) {
          this.loading.dismiss()
          this.loadremoveIf = false
        }
        this.token = auth.token
        if(this.token) {
          if(auth.name) {
            this.name = auth.name
          }else {
            this.name = auth.userName
         }
         
        }else{
          this.name = ''
        }
        })
      
  }
  ionViewDidLeave(){
    this._sub$.unsubscribe()
  }
  goPage(page: string) {
    this.navCtrl.push(page)
  }
  headClick() {
    this.token?this.goPage('MymessPage'):this.goPage('LoginPage')
  }
  logout() {
    const alert = this.alert.create({
      title: '是否退出',
     
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            
          }
        },
        {
          text: '确定',
          handler: () => {
            this.loading.present()
            this.loadremoveIf = true
            this.store$.dispatch(new actions.LogoutAction({}))
            //alert.dismiss()
          }
        }
      ]
    })

    alert.present()
    
  }
}
