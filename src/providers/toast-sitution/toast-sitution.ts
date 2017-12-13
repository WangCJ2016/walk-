import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController, LoadingController } from 'ionic-angular'
import 'rxjs/add/operator/map';

/*
  Generated class for the ToastSitutionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastSitutionProvider {

  constructor(public http: Http,
        private toast: ToastController,
        private load: LoadingController
      ) {
  }
  message(mess: string) {
    this.toast.create({
      message: mess,
      position: 'middle',
      duration: 2000
    }).present()
  }
  loadfn() {
   return this.load.create({
      dismissOnPageChange:true,
      duration:5000
    })
  }
}
