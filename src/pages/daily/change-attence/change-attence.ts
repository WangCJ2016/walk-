import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading } from 'ionic-angular';
import { FormGroup, FormBuilder} from '@angular/forms'
import { todayFormat} from '../../../utils'
import { ToastSitutionProvider } from '../../../providers'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../../reducer'
import * as attenceActions from '../../../actions/attence.action'
/**
 * Generated class for the ChangeAttencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-attence',
  templateUrl: 'change-attence.html',
})
export class ChangeAttencePage {
  form: FormGroup
  attence_types: Array<any>
  check_index: number
  todayFormat
  loading: Loading
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder,
    private store$: Store<fromRoot.State>,
    private toast: ToastSitutionProvider
  ) {
    this.loading = this.toast.loadfn()
    this.todayFormat = todayFormat()
    this.attence_types = [
      {class: 'thing',title: '事假'},
      {class: 'sick',title: '病假'},
      {class: 'holiday',title: '休假'},
      {class: 'work',title: '外勤'},
      {class: 'normal',title: '正常'}]
    this.form = this.fb.group({
      reason:[''],
      timeObj: ['']
    })
    this.form.get('timeObj').valueChanges.subscribe(v=>console.log(v))
    
  }

  ionViewDidEnter(){
   console.log(this.navParams.data)
  }
  choseType(index: number) {
    console.log(index)
    this.check_index = index
  }
  ngSubmit(f) {
    if(!this.check_index&&this.check_index!==0) {
      this.toast.message('请选择类型')
      return
    }
    if(!f.value.reason) {
      this.toast.message('请填写事由')
      return
    }
    this.loading.present()
    this.store$.dispatch(new attenceActions.setAttenceAction({
      deptId:this.navParams.data.deptId,
      empId1:this.navParams.data.empId,
      status:this.check_index+1,
      startDate: f.value.timeObj.startDate,
      apm:f.value.timeObj.startSx=='AM'?1:2,
      dayCounts:f.value.timeObj.day,
      endDate:f.value.timeObj.endDate,
      reason:f.value.reason
    }))
  }
}
