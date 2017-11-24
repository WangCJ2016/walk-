import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CityPickerProvider } from '../../../providers/city-picker/city-picker'

import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/auth.action'
/**
 * Generated class for the MyCityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-city',
  templateUrl: 'my-city.html',
})
export class MyCityPage {
  cityData: string
  cityName: string 
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cityPickerSev: CityPickerProvider,
              private store$: Store<fromRoot.State>) {
                this.setCityPickerData()
  }

  ionViewDidLoad() {
    this.store$.select(store => store.auth.auth.address).subscribe(v => this.cityName = v)
  }
  setCityPickerData(){
    this.cityPickerSev.getCitiesData()
      .then( data => {
        this.cityData = data
      });
  }
  cityChange(e){
    console.log(e)
    this.cityName = e.province.text+e.city.text +'-'+'-'+e.region.text
  }
  submit() {
    this.store$.dispatch(new actions.ChangeAction({address: this.cityName}))
  }
}
