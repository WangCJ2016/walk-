import { Component, ViewChild, ElementRef, Renderer2, forwardRef, Inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS} from '@angular/forms'
import { FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker'
import { Keyboard } from '@ionic-native/keyboard'
//import { ImagePicker } from '@ionic-native/image-picker';
/**
 * Generated class for the FooterInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'footer-input',
  templateUrl: 'footer-input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FooterInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FooterInputComponent),
      multi: true
    }
  ]
})
export class FooterInputComponent implements ControlValueAccessor {
  @ViewChild('more') more: ElementRef
  @ViewChild('inputcase') inputcase: ElementRef
  content: string
  show: boolean = false
  moreShow: boolean = false
  private propagateChange = (_: any) => { }
  constructor(
    private rd: Renderer2,
    private keyboard: Keyboard,
    private camera2: Camera,
    private fileTranfer: FileTransfer,
    private imagePicker: ImagePicker,
    @Inject('BASE_URL') private config,
   // private imagepicker: ImagePicker
  ) {
    
  }
  moreClick() {
    
    this.moreShow = true
    this.show = !this.show
    this.show === true ? this.rd.setStyle(this.more.nativeElement, 'height', '10.916667rem'):
    this.rd.setStyle(this.more.nativeElement, 'height', '0')
  }
  inputFocus() {
    //this.moreShow = false
  
    
    this.keyboard.disableScroll(true)
    const that = this
    window.addEventListener('native.keyboardshow', keyboardShowHandler);
    function keyboardShowHandler(e){
  
      that.rd.setStyle(that.inputcase.nativeElement,'bottom',e.keyboardHeight+'px')
      that.propagateChange({keyboardHeight:e.keyboardHeight+'px'})
    }
    window.addEventListener('native.keyboardhide', function() {
      that.propagateChange({keyboardHeight:'0px'})
      that.rd.setStyle(that.inputcase.nativeElement,'bottom',0+'px')
      that.rd.setStyle(that.more.nativeElement, 'height', '10.916667rem')
    });
  }
  ngOnDestroy() {
    window.removeEventListener('native.keyboardshow',function() {})
    window.removeEventListener('native.keyboardhide', function() {})
  }
  // submit
  submit() {
    console.log(this.content)
    this.propagateChange({contents:this.content,type:4})
    this.content = ''
  }
  // 拍照
  camera() {
    const options = {
      destinationType: this.camera2.DestinationType.FILE_URI,
      sourceType: this.camera2.PictureSourceType.CAMERA,
      quality: 40,
      allowEdit: true,
      targetWidth: 400, //照片宽度
      targetHeight: 400
    }
    this.camera2.getPicture(options).then((imageData) => {
      console.log('camera:'+imageData)
      const fileTransfer: FileTransferObject = this.fileTranfer.create();
      fileTransfer.upload(imageData, `${this.config.url}/appPhotoUploadServlet`,{})
      .then((res) => {
        // success
        const photo = JSON.parse(res.response).fileUrl[0]
        this.propagateChange({attach:photo.url,attachName:photo.name,type:2})
      }, (err) => {
        // error
      })  
     }, (err) => {
      // Handle error
     });
  }
  // 相册
  imgPicker() {
    const options = {
      maximumImagesCount: 1,
      width: 100,
      height: 100,
      quality: 50
    }
    this.imagePicker.getPictures(options).then((result) => {
      console.log('imgPicker:'+result)
      const fileTransfer: FileTransferObject = this.fileTranfer.create();
      fileTransfer.upload(result[0], `${this.config.url}/appPhotoUploadServlet`,{})
      .then((res) => {
        // success
        const photo = JSON.parse(res.response).fileUrl[0]
        console.log('success'+photo)
        this.propagateChange({attach:photo.url,attachName:photo.name,type:2})
      }, (err) => {
        // error
      })
          return false
    }, (err) => { });
  }


  writeValue(obj: any): void { }
  
    registerOnChange(fn: any): void {
      this.propagateChange = fn
    }
  
    registerOnTouched() {
  
    }
    validate(c): {[key: string]: any} {
      return null
     }
}
