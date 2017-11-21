import { Component, ViewChild, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { getColor } from '../../../utils'
import { Keyboard } from '@ionic-native/keyboard'

/**
 * Generated class for the ShenpiDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shenpi-detail',
  templateUrl: 'shenpi-detail.html',
})
export class ShenpiDetailPage {
  @ViewChild('inputcase') inputcase
  @ViewChild('input') input
  shenpiType: string
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private keyboard: Keyboard,
     private rd: Renderer2) {
    this.shenpiType = 'detail'
  }
  getColor(): string{
    return getColor()
  }
  inputFocus() {
    this.keyboard.disableScroll(true)
    const that = this
    window.addEventListener('native.keyboardshow', keyboardShowHandler);
    function keyboardShowHandler(e){
      that.rd.setStyle(that.inputcase.nativeElement,'bottom',e.keyboardHeight+'px')
    }
    window.addEventListener('native.keyboardhide', function() {
      that.rd.setStyle(that.inputcase.nativeElement,'bottom',0+'px')
    });
  }
  ngOnDestroy() {
    window.removeEventListener('native.keyboardshow',function() {})
    window.removeEventListener('native.keyboardhide', function() {})
  }
}
