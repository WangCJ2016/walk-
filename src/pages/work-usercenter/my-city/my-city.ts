import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CityPickerProvider } from '../../../providers/city-picker/city-picker'
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
  cityData
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cityPickerSev: CityPickerProvider,) {
                this.setCityPickerData()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCityPage');
  }
  setCityPickerData(){
    this.cityPickerSev.getCitiesData()
      .then( data => {
        this.cityData = data
        console.log(data)
      });
  }
  cityChange(e){
    console.log(e)
  }
}
