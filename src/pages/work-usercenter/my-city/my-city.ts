import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CityPickerProvider } from '../../../providers/city-picker/city-picker'

import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as actions from '../../../actions/auth.action'
import { AuthProvider } from '../../../providers/auth/auth'
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
  selectCityInfo
  provinceId: number
  cityId: number
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cityPickerSev: CityPickerProvider,
              private service: AuthProvider,
              private store$: Store<fromRoot.State>) {
                this.setCityPickerData()
  }

  ionViewDidLoad() {
    
  }
  setCityPickerData(){
    this.cityPickerSev.getCitiesData()
      .then( data => {
        this.cityData = data
      });
  }
  cityChange(e){
    this.selectCityInfo = e
    this.cityName = e.province.text+'-'+e.city.text +'-'+e.region.text
  }
  submit() {
    this.service.sysRegionList('-1')
    .map(province => {
     return province.dataObject.filter(province => province.name === this.selectCityInfo.province.text)
    })
    .switchMap(province => {
      this.provinceId = province[0].id
      return this.service.sysRegionList(province[0].id)
     .map(city => {
      return city.dataObject.filter(city => city.name === this.selectCityInfo.city.text)
      })})
      .subscribe(v => {
        this.cityId = v[0].id
        this.store$.dispatch(new actions.ChangeAction({provinceId: this.provinceId, cityId: this.cityId}))
        })
     
  }
}
