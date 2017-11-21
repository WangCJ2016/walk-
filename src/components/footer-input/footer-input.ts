import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard'
/**
 * Generated class for the FooterInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'footer-input',
  templateUrl: 'footer-input.html'
})
export class FooterInputComponent {
  @ViewChild('more') more: ElementRef
  @ViewChild('inputcase') inputcase: ElementRef
  show: boolean = false
  moreShow: boolean = false
  constructor(private rd: Renderer2,private keyboard: Keyboard,) {

  }
  moreClick() {
    this.moreShow = true
    this.show = !this.show
    this.show === true ? this.rd.setStyle(this.more.nativeElement, 'height', '10.916667rem'):
    this.rd.setStyle(this.more.nativeElement, 'height', '0')
  }
  inputFocus() {
    this.moreShow = false
    this.keyboard.disableScroll(true)
    const that = this
    window.addEventListener('native.keyboardshow', keyboardShowHandler);
    function keyboardShowHandler(e){
      that.rd.setStyle(that.inputcase.nativeElement,'bottom',e.keyboardHeight+'px')
    }
    window.addEventListener('native.keyboardhide', function() {
      that.rd.setStyle(that.inputcase.nativeElement,'bottom',0+'px')
      that.rd.setStyle(that.more.nativeElement, 'height', '10.916667rem')
    });
  }
  ngOnDestroy() {
    window.removeEventListener('native.keyboardshow',function() {})
    window.removeEventListener('native.keyboardhide', function() {})
  }
}
